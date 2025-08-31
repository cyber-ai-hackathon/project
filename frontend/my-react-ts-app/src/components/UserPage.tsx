import React, { useState } from "react";
import Sidebar from "./Sidebar";

const UserPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div>
      {/* サイドバー開閉ボタン */}
      {!isSidebarOpen && (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "50px",     // 正方形
            height: "50px",    // 正方形
            backgroundColor: "#007bff",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => setIsSidebarOpen(true)}
        >
          {/* 縦線（仕切り） */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: "1px",
              height: "100%",
              backgroundColor: "rgba(255,255,255,0.5)",
            }}
          />
          ☰

          {isHovering && (
            <div
              style={{
                position: "absolute",
                left: "110%",
                top: "50%",
                transform: "translateY(-50%)",
                marginLeft: "10px",
                backgroundColor: "black",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                whiteSpace: "nowrap",
              }}
            >
              サイドバーを開く
            </div>
          )}
        </div>
      )}

      {/* サイドバー */}
      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}

      {/* メインコンテンツ */}
      <div style={{ marginLeft: isSidebarOpen ? "300px" : 0, transition: "margin-left 0.3s" }}>
        <h1 style={{ textAlign: "center", marginTop: "100px" }}>ユーザーページ</h1>
        <p style={{ textAlign: "center" }}>ここはユーザーページです。</p>
      </div>
    </div>
  );
};

export default UserPage;
