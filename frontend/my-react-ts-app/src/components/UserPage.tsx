import React, { useState, useRef } from "react";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList/MessageList";
import type { Msg } from "./MessageList/MessageList";
import "./UserPage.css";
import { SlControlPlay } from "react-icons/sl";

const UserPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const [question, setQuestion] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // メッセージの状態管理
  const [messages, setMessages] = useState<Msg[]>([]);

  // const dummy: Msg[] = [
  //   { id: "1", role: "user", text: "こんにちは！", timestamp: new Date() },
  //   { id: "2", role: "ai", text: "こんにちは！今日は何をしますか？", timestamp: new Date() },
  //   { id: "3", role: "user", text: "吹き出しUIのテスト中です。", timestamp: new Date() },
  //   { id: "4", role: "ai", text: "おー！ちゃんと左右に分かれて表示されていますね。", timestamp: new Date() },
  //   { id: "5", role: "user", text: "ちなみに背景色はどうですか？", timestamp: new Date() },
  //   { id: "6", role: "ai", text: "淡い色合いで見やすいと思いますよ。", timestamp: new Date() },
  //   { id: "7", role: "user", text: "メッセージが増えたときにスクロールされますか？", timestamp: new Date() },
  //   { id: "8", role: "ai", text: "はい、自動で下までスクロールされるはずです。", timestamp: new Date() },
  //   { id: "9", role: "user", text: "吹き出しの角丸もいい感じです。", timestamp: new Date() },
  //   { id: "10", role: "ai", text: "細かい部分をCSSで調整すると、さらに自然になりますね。", timestamp: new Date() },
  //   { id: "11", role: "user", text: "テール（三角部分）の位置はどうでしょう？", timestamp: new Date() },
  //   { id: "12", role: "ai", text: "右側は右下、左側は左下から伸びるように調整済みです。", timestamp: new Date() },
  //   { id: "13", role: "user", text: "長文を入力した場合も大丈夫ですか？", timestamp: new Date() },
  //   { id: "14", role: "ai", text: "はい、最大幅を決めてあるので自動で折り返されます。", timestamp: new Date() },
  //   { id: "15", role: "user", text: "スマホ表示でも崩れませんか？", timestamp: new Date() },
  //   { id: "16", role: "ai", text: "flexbox を使っているのでレスポンシブ対応もしやすいです。", timestamp: new Date() },
  //   { id: "17", role: "user", text: "なるほど！これなら安心です。", timestamp: new Date() },
  //   { id: "18", role: "ai", text: "めちゃくちゃ長い「あ」ですね！🤣いい感じに折り返されて吹き出し内に収まっていますか？こういう極端なテストをすると、word-break: break-word; と max-width の指定がちゃんと効いているか確認できるのでとても有効ですよ。👉 質問ですが、いま試しているのは 「長文が吹き出しにどう表示されるか」 を確かめるためですか？", timestamp: new Date() },
  // ];
  
  const fetchAI = async (): Promise<string> => {
    try {
      const response = await fetch("http://localhost:8000/response");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("GET response:", data);
      return data;
    } catch (err) {
      console.error("Fetch error:", err);
      return "エラーが発生しました";
    }
  };

  // 質問を送信する
  const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault();
    const content = question.trim();
    if (!content) return;

    try {
      console.log("Form submitted:", content);
      await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: content })
      });
      const uid = crypto.randomUUID();
      setMessages(prev => [...prev, { id: uid, role: "user", text: content, timestamp: new Date() }]);
    } catch (err) {
      console.error("submit failed", err);
    } finally {
      setQuestion("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }

    const aiText = await fetchAI(); 
    const aid = crypto.randomUUID();
    setMessages(prev => [...prev, { id: aid, role: 'ai', text: aiText, timestamp: new Date()}]);
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
          {/* 縦線 */}
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
      <div>

        {/* 入力フォーム */}
        <div className="wrapper">
          {messages.length === 0 &&
            <p className="title">
              はじめましょう！
            </p>
          }
          <MessageList messages={messages} />
          <div className="container">
            <form onSubmit={handleSubmit} className="postForm">
              <textarea
                ref={textareaRef}
                value={question}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="メッセージを入力してください..."
                className="textArea"
              />
              <button type="submit" className="postButton">
                <SlControlPlay size={24} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
