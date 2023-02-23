import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Bottombar from "./Component/Bottombar";
import TimeLine from "./Component/TimeLine";
import Search from "./Component/Search";
import Wrongpage from "./Component/Wrongpage";

function App() {
  const userInfo = {
    name: "양해미",
    photo:
      "https://imgscience.ytn.co.kr/sciencetv/jpg/vod1459/2021//202112071802272615_h.jpg",
    introduce: "안녕하세요",
  };

  return (
    <>
      <BrowserRouter>
        <header>
          <h1>블로그</h1>
        </header>
        <div className="mainBox">
          <div className="sideBar">
            <img src={userInfo.photo} className="profilePhoto"></img>
            <h3>{userInfo.name}</h3>
            <p>{userInfo.introduce}</p>
          </div>

          <Routes>
            <Route path="/" element={<TimeLine></TimeLine>} />
            <Route path="/search" element={<Search></Search>} />
            <Route path="*" element={<Wrongpage></Wrongpage>} />
          </Routes>
        </div>
        <Bottombar></Bottombar>
      </BrowserRouter>
    </>
  );
}
export default App;
