// frontend/src/App.tsx

import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // バックエンドのAPIエンドポイントにアクセス
    fetch('http://localhost:8000/api/message')
      .then(response => response.json())
      .then(data => {
        // メッセージが正常に取得できたら、成功コメントとメッセージをセット
        setMessage(`成功しました: ${data.message}`);
      })
      .catch(error => {
        // エラーが発生した場合は、エラーメッセージをセット
        console.error('Error fetching data:', error);
        setMessage('エラーが発生しました');
      });
  }, []);

  return (
    <>
      <h1>FastAPI + React 連携テスト</h1>
      <div className="card">
        <p>
          {message ? (
            // messageが取得できたら表示
            <strong>{message}</strong>
          ) : (
            // データ取得中はローディング表示
            <span>APIからデータを取得中...</span>
          )}
        </p>
      </div>
    </>
  );
}

export default App;