import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const userInfo = {
    name: "양해미",
    photo:
      "https://imgscience.ytn.co.kr/sciencetv/jpg/vod1459/2021//202112071802272615_h.jpg",
    introduce: "안녕하세요",
  };

  const [text, setText] = useState("");
  const [post, setPost] = useState(["H2O", "커피"]);

  const handlePost = () => {
    setPost((prevList) => [...prevList, text]);
    setText("");
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

  let articles = props.post.map((article, i) => {
    let removed = () => {
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
