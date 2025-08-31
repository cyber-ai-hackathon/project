import React, { useEffect, useRef } from "react";
import MessageBubble from "../MessageBubble/MessageBubble";
import "./MessageList.css";

export type Msg = { id: string; role: 'user' | 'ai'; text: string; timestamp: Date; };

const MessageList: React.FC<{ messages: Msg[] }> = ({ messages }) => {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map(m => (
        <div
          key={m.id}
          className={`message-row-${m.role === 'user' ? 'right' : 'left'}`}
        >
          <MessageBubble text={m.text} role={m.role} />
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default MessageList;