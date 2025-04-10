"use client"
import { useState, useEffect, useRef, RefObject } from 'react';
import styles from '../styles/pages/home.module.scss';
import stylesTalking from '../styles/components/talking-character.module.scss';
import { Header } from '../components/Header';
import { NavigationSettings } from '../components/NavigationSettings';
import { useSelector } from 'react-redux';
import { RootState } from "@/store/store";
import { TalkingCharacter } from '../components/TalkingCharacter';
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder';

type TypeSpeakTextProps = {
  question?: string;
  requestQuestion?: string;
  languageChoice: string;
  aiElementRef: RefObject<HTMLElement | null>;
  setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>;
  setLastSpeaking: React.Dispatch<React.SetStateAction<boolean>>;
}

const speakText = ({ question, requestQuestion, languageChoice, aiElementRef, setIsSpeaking, setLastSpeaking }: TypeSpeakTextProps) => {
  if (requestQuestion) setLastSpeaking(true)
  const textToSpeak = question || requestQuestion;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = languageChoice;
  setIsSpeaking(true)
  speechSynthesis.speak(utterance);

  utterance.onend = () => {
    setIsSpeaking(false)
    aiElementRef.current?.classList.remove(stylesTalking['ai-container-active'])
  };
};


const Home = () => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isLastSpeaking, setLastSpeaking] = useState<boolean>(false)
  const [questionGeneratorInput, setQuestionGeneratorInput] = useState<string>('')
  const [questionToCheck, setQuestionToCheck] = useState<string>('')
  const [requestQuestionsList, setRequestQuestionsList] = useState<string[] | []>([])
  const [requestQuestion, setRequestQuestion] = useState<string>('')
  const [question, setQuestion] = useState<string>('')
  const [answer, setAnswer] = useState<string>('')
  const [start, setStart] = useState<boolean>(false);
  const [nextQuestion, setNextQuestion] = useState<boolean>(false)

  const languageChoice = useSelector((state: RootState) => state.settings.language)
  const professionChoice = useSelector((state: RootState) => state.settings.profession)
  const categoryChoice = useSelector((state: RootState) => state.settings.category)

  const countQuestionRef = useRef<number>(0)
  const aiElementRef = useRef<HTMLDivElement | null>(null)
  const userElementRef = useRef<HTMLDivElement | null>(null)

  const { isRecording, transcript, startRecording, stopRecording } = useVoiceRecorder({ languageChoice });

  // Прочитати відразу запитання пізля рендеру!
  useEffect(() => {
    if ((question || requestQuestion) && start) {

      if ((question || requestQuestion) && start && !isLastSpeaking) {
        handleSpeekAi();
      }

      if (requestQuestion) {
        setQuestion('')
      }
    }
  }, [question, requestQuestion, start, isLastSpeaking]);

  //Згенерувати список запитань для штучного інтелекту!
  useEffect(() => {
    const generateQuestion: string = `Напиши мені 25 запитань, які найчастіше задають на співбесідах для ${categoryChoice}, на мові ${languageChoice}. Будь ласка, не використовуйте занадто складні або специфічні питання, а надайте загальні питання, які зазвичай задають для цієї професії або категорії.`
    setQuestionGeneratorInput(generateQuestion)
  }, [languageChoice, professionChoice, categoryChoice])

  // Згенерувати запитання чи вірна відповідь!
  useEffect(() => {
    if (answer) {
      const check = `Питання: ${question}. Моя відповідь: ${answer}. Чи правильна ця відповідь? Відповідай чітко, коротко і без зайвих пояснень на ${languageChoice} мовою..`;
      setQuestionToCheck(check);
    }
  }, [answer, questionToCheck]);

  // записати  питання з списку запитань
  useEffect(() => {
    if (start && requestQuestionsList.length > 0) {
      setQuestion(requestQuestionsList[countQuestionRef.current])
    } else {
      countQuestionRef.current = 0
      setQuestion('')
    }

    setNextQuestion(false)
  }, [requestQuestionsList, nextQuestion, start]);

  // Записати відповідь в стейт!
  useEffect(() => {
    if (!isRecording && transcript) {
      setAnswer(transcript)
      userElementRef.current?.classList.remove(stylesTalking['user-container-active']);
    }
  }, [isRecording, transcript])

  // Зробити запит на провірку відповіді!
  useEffect(() => {
    if (questionToCheck) {
      handleSubmit();
    }
  }, [questionToCheck]);

  //Запуск запису голосу
  const handleStartRecordingVoice = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
      if (userElementRef.current) {
        userElementRef.current.classList.add(stylesTalking['user-container-active']);
      }
    }
  }

  //Функція запит до сервера
  const handleSubmit = async () => {
    setStart(true)
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: questionToCheck ? questionToCheck : questionGeneratorInput }
        ],
      }),
    });

    const data = await res.json();

    if (data) {
      if (questionToCheck) {
        setRequestQuestion(data.response.replace(/\*\*/g, '').trim())
      } else {
        setRequestQuestionsList(data.response
          .split('\n')
          .filter((line: string) => /^\d+\.\s/.test(line))
          .map((line: string) =>
            line
              .replace(/^\d+\.\s*/, '')
              .replace(/\*\*/g, '')
              .trim()
          )
        )
      }
    }
  };

  //Запустити читання запитання АІ
  const handleSpeekAi = () => {
    if (aiElementRef.current) {
      aiElementRef.current.classList.add(stylesTalking['ai-container-active'])
    }
    if (requestQuestion) {
      speakText({ requestQuestion, languageChoice, aiElementRef, setIsSpeaking, setLastSpeaking });
    } else {
      speakText({ question, languageChoice, aiElementRef, setIsSpeaking, setLastSpeaking });
    }
  }

  //Функція Наступне питання
  const handleNextAnswer = () => {
    countQuestionRef.current += 1;
    setAnswer('')
    setRequestQuestion('')
    setLastSpeaking(false)
    speechSynthesis.cancel();

    if (countQuestionRef.current < requestQuestionsList.length) {
      setNextQuestion(true)
    } else {
      handleStop();
    }
  }

  //Зупинити співбесіду
  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setRequestQuestionsList([]);
    setRequestQuestion('');
    setQuestionToCheck('')
    setQuestion('');
    setAnswer('');
    setStart(false);
    setLastSpeaking(false);
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <NavigationSettings onClick={handleSubmit} hideSetting={start} />
      <main className={styles.main}>
        {start &&
          <>
            {requestQuestionsList.length === 0
              ? (
                <section className={styles['block-loading']}>
                  <p>Тільки не панікуйте… ще є шанс втекти. Жартую — вже пізно 😁 Починаємо!</p>
                  <div className={styles.strip}></div>
                </section>
              ) : (
                <section className={styles['section-content']}>
                  <>
                    <div className={(isRecording || isSpeaking || answer) ? `${styles['block-character']} ${styles.disabled}` : `${styles['block-character']}`}>
                      <TalkingCharacter person='aiSpeechBubble' ref={aiElementRef} onClick={handleSpeekAi} />
                      <TalkingCharacter person='userSpeechBubble' ref={userElementRef} onClick={handleStartRecordingVoice} />
                    </div>
                    <div className={styles['text-block']}>
                      <p className={styles.question}>{requestQuestion ? requestQuestion : question}</p>
                      <p className={answer ? styles.answer : styles['answer-empty']}>{answer}</p>
                    </div>
                  </>
                  <div className={styles['block-button']}>
                    <button onClick={handleNextAnswer}>Наступне питання</button>
                    <button onClick={handleStop}>Закінчити співбесіду</button>
                  </div>
                </section>
              )}
          </>
        }
      </main>
    </div>
  );
};

export default Home;