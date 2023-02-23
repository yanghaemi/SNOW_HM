import "../App.css";
import { Link } from "react-router-dom";

const Bottombar = () => {
  return (
    <div className="bar">
      <Link to="/">
        <h3 className="bottomBarBtn">홈</h3>
      </Link>
      <Link to="/search">
        <h3 className="bottomBarBtn">검색</h3>
      </Link>
      <Link to="/mypage">
        <h3 className="bottomBarBtn">마이페이지</h3>
      </Link>
    </div>
  );
};

export default Bottombar;
