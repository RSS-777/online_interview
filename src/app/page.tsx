"use client"
import { useState, useEffect } from 'react';
import styles from '../styles/pages/home.module.scss';
import { Header } from '../components/Header';
import { NavigationSettings } from '../components/NavigationSettings';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "@/store/store";

const Home = () => {
  const [input, setInput] = useState<string>('');
  const [response, setResponse] = useState('');
  const languageChoice = useSelector((state: RootState) => state.settings.language)
  const professionChoice = useSelector((state: RootState) => state.settings.profession)
  const categoryChoice = useSelector((state: RootState) => state.settings.category)

  useEffect(() => {
    const generateQuestion: string = `Пиши мені лиш на ${languageChoice}! Напиши мені 10 запитань які задають на співбесідах для ${categoryChoice}`
    setInput(generateQuestion)
  }, [languageChoice, professionChoice, categoryChoice])


  const handleSend = async () => {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: input }
        ],
      }),
    });

    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <NavigationSettings />
      <main className={styles.main}>
        {/* <input value={input} onChange={(e) => setInput(generateQuestion)} placeholder="Спробуй запитати щось..." /> */}
        {/* <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Спробуй запитати щось..." /> */}
        <button onClick={handleSend}>Відправити</button>
        <p>Відповідь: {response}</p>
      </main>
    </div>
  );
};

export default Home;
