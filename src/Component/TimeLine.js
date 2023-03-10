import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const TimeLine = () => {
  const [text, setText] = useState("");
  const [post, setPost] = useState([]);

  const testApi = async () => {
    const requestOptions = {
      title: text,
      content: text,
    };
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

  const reload = async () => {
    try {
      const response = await axios.get("http://localhost:8000/showblog");
      console.log(response);
      setPost(response.data.content);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePost = () => {
    if (text !== "") {
      // setPost((prevList) => [...prevList, text]);
      setText("");
      testApi(text);
      reload();
    }
  };

  useEffect(() => {
    reload();
  }, post);

  return (
    <>
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
        <Article post={post} setPost={setPost} reload={reload}></Article>
      </main>
    </>
  );
};

const Article = (props) => {
  let editInputText = "";

  useEffect(() => {
    props.reload();
  }, [props.post]);

  const articleDel = async (r) => {
    const requestOptions = {
      title: r,
      content: r,
    };

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
      props.reload();
    };

    return (
      <>
        <div className="article">
          <p>{article}</p>

          <button onClick={removed}>삭제</button>
        </div>
      </>
    );
  });
  return <div>{articles}</div>;
};

export default TimeLine;
