import React from "react";
import { AiOutlineClose } from "react-icons/ai";

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "300px",
        height: "100vh",
        backgroundColor: "#f0f0f0",
        boxShadow: "2px 0px 5px rgba(0,0,0,0.3)",
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <AiOutlineClose size={24} />
      </button>


      {/* 新しいチャットボタン */}
      <button style={{ display: "block", margin: "10px 0" }}>新しいチャット</button>

      {/* チャット検索ボタン */}
      <button style={{ display: "block", margin: "10px 0" }}>チャット検索</button>

      {/* チャット履歴（例） */}
      <div style={{ marginTop: "20px" }}>
        <h3>チャット履歴</h3>
        <ul>
          <li><button>チャットルーム1の要約</button></li>
          <li><button>チャットルーム2の要約</button></li>
          <li><button>チャットルーム3の要約</button></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
