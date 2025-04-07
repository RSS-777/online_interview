"use client"
import { useState } from 'react';
import styles from './page.module.css';

export const sendMessageToMistral = async (messages: { role: string; content: string }[]) => {
  const res = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  const data = await res.json();
  return data.response;
};

const Home = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    const reply = await sendMessageToMistral([
      { role: 'user', content: input },
    ]);
    setResponse(reply);
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Спробуй запитати щось..." />
      <button onClick={handleSend}>Відправити</button>
      <p>Відповідь: {response}</p>
    </div>
  );
};

export default Home;
