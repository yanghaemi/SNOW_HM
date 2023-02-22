import "../App.css";
import { Link } from "react-router-dom";

const Bottombar = () => {
  return (
    <div className="bar">
      <h3 className="bottomBarBtn">홈</h3>

      <h3 className="bottomBarBtn">검색</h3>

      <h3 className="bottomBarBtn">마이페이지</h3>
    </div>
  );
};

export default Bottombar;
