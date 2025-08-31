import React from 'react';
import './MessageBubble.css';

// MessageBubble.tsx

type Props = {
  text: string;
  role: 'user' | 'ai';
};

const MessageBubble: React.FC<Props> = ({ text, role }) => {
  return (
    <div className={`bubble-${role}`}>
      <p className="bubble-text">{text}</p>
    </div>
  );
};

export default MessageBubble;