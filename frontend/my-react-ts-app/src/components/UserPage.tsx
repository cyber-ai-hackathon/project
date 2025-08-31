import React from "react";
import styles from "./UserPage.module.css";
import { SlControlPlay } from "react-icons/sl";

const UserPage: React.FC = () => {
  const [message, setMessage] = React.useState<string>("");
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) e.preventDefault(); 
    const content = message.trim();
    if (!content) return; 
    try {
      console.log("Form submitted");
      // await fetch("http://localhost:8000/api/message", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ message: content })
      // });
    } catch (err) {
      console.error("submit failed", err);
    } finally {
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
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
    <div className={styles.wrapper}>  
      <p className={styles.title}>はじめましょう！</p>
      {/* 改行すると上が消えちゃう問題 */}
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
  );
};

export default UserPage;
