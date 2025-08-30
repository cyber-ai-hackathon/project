import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>ホームページ</h1>
      <div style={{ marginTop: "50px" }}>
        <Link to="/shokujin" style={{ marginRight: "30px", fontSize: "20px" }}>
          属人化ページ
        </Link>
        <Link to="/user" style={{ fontSize: "20px" }}>
          ユーザーページ
        </Link>
      </div>
    </div>
  );
};

export default Home;
