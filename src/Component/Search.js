import "../App.css";
import axios from "axios";
import { useState, useEffect } from "react";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchPost, setSearchPost] = useState([]);

  const searchApi = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/search/${searchText}`,
        searchText
      );
      console.log(res);
      setSearchPost(res.data.searchRes);
    } catch (e) {
      console.log(e);
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
      <button
        onClick={() => {
          if (searchText !== "") {
            searchApi(searchText);
          }
        }}
      >
        검색
      </button>
      <SearchList
        setSearchPost={setSearchPost}
        searchPost={searchPost}
      ></SearchList>
    </main>
  );
};

const SearchList = (props) => {
  let searchArticles = props.searchPost.map((searchArticle, i) => {
    return (
      <div className="article">
        <p>{searchArticle}</p>
      </div>
    );
  });

  return <>{searchArticles}</>;
};

export default Search;
