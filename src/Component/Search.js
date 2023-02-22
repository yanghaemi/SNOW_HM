import "../App.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchPost, setSearchPost] = useState([]);

  const searchApi = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/search", searchText);
      console.log(res);
      setSearchPost(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const reload = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/search",
        searchText
      );
      console.log(response);
      setSearchPost(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePost = () => {
    if (searchText !== "") {
      // setPost((prevList) => [...prevList, text]);
      setSearchText("");
      searchApi(searchText);
      reload();
    }
  };

  return (
    <main>
      <input
        type="text"
        onChange={(e) => {
          console.log(e.target.value);
          setSearchText(e.target.value);
        }}
        value={searchText}
        placeholder="search"
      ></input>
      <button onClick={handlePost}></button>
    </main>
  );
};

export default Search;
