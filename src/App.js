import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const userInfo = {
    name: "양해미",
    photo:
      "https://imgscience.ytn.co.kr/sciencetv/jpg/vod1459/2021//202112071802272615_h.jpg",
    introduce: "안녕하세요",
  };

  const [text, setText] = useState("");
  const [post, setPost] = useState(["H2O", "커피"]);

  const testApi = async () => {
    const requestOptions = {
      title: text,
      content: text,
    };

    console.log(requestOptions);

    try {
      const response = await axios.post(
        "http://localhost:8000/addblog/",
        requestOptions
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  // const reload = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/");
  //     console.log(response.data);
  //     return response.data;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const handlePost = () => {
    if (text !== "") {
      setPost((prevList) => [...prevList, text]);
      setText("");
      testApi(text);
    }
  };

  return (
    <>
      <header>
        <h1>블로그</h1>
      </header>

      <div className="sideBar">
        <img src={userInfo.photo} className="profilePhoto"></img>
        <h3>{userInfo.name}</h3>
        <p>{userInfo.introduce}</p>
      </div>

      <main>
        <input
          type="text"
          placeholder="오늘 기분을 기록해보세요"
          onChange={(e) => {
            console.log(e.target.value);
            setText(e.target.value);
          }}
          value={text}
        ></input>
        <button onClick={handlePost}>제출</button>
        <p>{post.length}개의 기록</p>
        <Article post={post} setPost={setPost}></Article>
      </main>
    </>
  );
}

const Article = (props) => {
  let editInputText = "";

  useEffect(() => {
    console.log(props.post);
  }, [props.post]);

  const articleDel = async (r) => {
    const requestOptions = {
      title: r,
      content: r,
    };

    console.log(r);

    try {
      const response = await axios.post(
        "http://localhost:8000/delectblog",
        requestOptions
      );
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  let articles = props.post.map((article, i) => {
    let removed = () => {
      articleDel(article);
      props.post.splice(i, 1);
      let tempPost = [...props.post];
      props.setPost(tempPost);
    };

    let modified = () => {
      props.setPost((pre) => {
        let newPost = [...pre];
        newPost[i] = editInputText;
        return newPost;
      });
    };

    return (
      <>
        <div className="article">
          <p>{article}</p>

          <button onClick={removed}>삭제</button>
          <form>
            <input
              type="text"
              onChange={(e) => {
                editInputText = e.target.value;
              }}
            ></input>
            <button onClick={modified}>수정</button>
          </form>
        </div>
      </>
    );
  });
  return <div>{articles}</div>;
};

export default App;
