import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import styles from "./UserPage.module.css";
import { SlControlPlay } from "react-icons/sl";

const UserPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const [message, setMessage] = useState<string>("");
  const [chatList, setChatList] = useState<{ type: "user" | "ai"; text: string }[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    const content = message.trim();
    if (!content) return;

    // ユーザーの発言を追加
    setChatList(prev => [...prev, { type: "user", text: content }]);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: content }),
      });
      const data = await res.json();
      setChatList(prev => [...prev, { type: "ai", text: data.answer }]);
    //   setSessionId(data.sessionId);
    } catch (err) {
      console.error("submit failed", err);
      setChatList(prev => [...prev, { type: "ai", text: "回答取得に失敗しました" }]);
    } finally {
      setMessage("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

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
            width: "50px",
            height: "50px",
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

      {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}

      {/* メインコンテンツ */}
      <div className={styles.wrapper}>
        <p className={styles.title}>はじめましょう！</p>

        {/* チャット表示 */}
        <div className={styles.chatContainer}>
          {chatList.map((chat, idx) => (
            <div
              key={idx}
              className={chat.type === "user" ? styles.userMessage : styles.aiMessage}
            >
              {chat.text}
            </div>
          ))}
        </div>

        {/* 入力フォーム */}
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.postForm}>
            <textarea
              ref={textareaRef}
              value={message}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="メッセージを入力してください..."
              className={styles.textArea}
            />
            <button type="submit" className={styles.postButton}>
              <SlControlPlay size={24} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
