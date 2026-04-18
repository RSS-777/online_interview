"use client"

import { RefObject, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Header } from '../components/Header';
import { InformationSpecialization } from '../components/InformationSpecialization';
import { NavigationSettings } from '../components/NavigationSettings';
import { TalkingCharacter } from '../components/TalkingCharacter';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import stylesTalking from '../styles/components/talking-character.module.scss';
import styles from '../styles/pages/home.module.scss';
import { RootState } from "../store/store";

type SpeakTextParams = {
  question?: string;
  feedback?: string;
  language: string;
  aiBubbleRef: RefObject<HTMLElement | null>;
  setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLastSpeaking: React.Dispatch<React.SetStateAction<boolean>>;
}

const speakText = ({
  question,
  feedback,
  language,
  aiBubbleRef,
  setIsSpeaking,
  setIsLastSpeaking
}: SpeakTextParams) => {
  if (feedback) setIsLastSpeaking(true)

  const textToSpeak = question || feedback;
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = language;
  setIsSpeaking(true)
  speechSynthesis.speak(utterance);

  utterance.onend = () => {
    setIsSpeaking(false)
    aiBubbleRef.current?.classList.remove(stylesTalking['ai-container-active'])
  };
};

const Home = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLastSpeaking, setIsLastSpeaking] = useState(false)
  const [interviewQuestionsPrompt, setInterviewQuestionsPrompt] = useState('')
  const [answerReviewPrompt, setAnswerReviewPrompt] = useState('')
  const [generatedQuestions, setGeneratedQuestions] = useState<string[]>([])
  const [aiFeedback, setAiFeedback] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [shouldAdvanceQuestion, setShouldAdvanceQuestion] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const selectedLanguage = useSelector((state: RootState) => state.settings.language)
  const selectedSpecialization = useSelector((state: RootState) => state.settings.specialization)
  const selectedTechnology = useSelector((state: RootState) => state.settings.technology)
  const selectedQuestionCount = useSelector((state: RootState) => state.settings.questionCount)

  const currentQuestionIndexRef = useRef(0)
  const aiBubbleRef = useRef<HTMLDivElement | null>(null)
  const userBubbleRef = useRef<HTMLDivElement | null>(null)

  const { isRecording, transcript, startRecording, stopRecording } = useVoiceRecorder({ languageChoice: selectedLanguage });

  useEffect(() => {
    if ((currentQuestion || aiFeedback) && interviewStarted) {
      if (!isLastSpeaking) {
        handleSpeakAi();
      }

      if (aiFeedback) {
        setCurrentQuestion('')
      }
    }
  }, [currentQuestion, aiFeedback, interviewStarted, isLastSpeaking]);

  useEffect(() => {
    const prompt = `Згенеруй ${selectedQuestionCount} коротких типових запитань, які найчастіше ставлять на співбесідах для спеціалізації "${selectedSpecialization}" за технологією "${selectedTechnology}". Формулюй запитання мовою ${selectedLanguage}, орієнтуючись на актуальні знання та практики.`;
    setInterviewQuestionsPrompt(prompt)
  }, [selectedLanguage, selectedSpecialization, selectedTechnology, selectedQuestionCount]);

  useEffect(() => {
    if (currentAnswer) {
      const prompt = `Питання: ${currentQuestion}. Моя відповідь: ${currentAnswer}. Чи правильна ця відповідь? Відповідай чітко, коротко і без зайвих пояснень мовою ${selectedLanguage}.`;
      setAnswerReviewPrompt(prompt);
    }
  }, [currentAnswer, currentQuestion, selectedLanguage]);

  useEffect(() => {
    if (interviewStarted && generatedQuestions.length > 0) {
      setCurrentQuestion(generatedQuestions[currentQuestionIndexRef.current])
    } else {
      currentQuestionIndexRef.current = 0
      setCurrentQuestion('')
    }

    setShouldAdvanceQuestion(false)
  }, [generatedQuestions, shouldAdvanceQuestion, interviewStarted]);

  useEffect(() => {
    if (!isRecording && transcript) {
      setCurrentAnswer(transcript)
      userBubbleRef.current?.classList.remove(stylesTalking['user-container-active']);
    }
  }, [isRecording, transcript]);

  useEffect(() => {
    if (answerReviewPrompt) {
      handleAiRequest();
    }
  }, [answerReviewPrompt]);

  const handleVoiceRecordingToggle = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
      userBubbleRef.current?.classList.add(stylesTalking['user-container-active']);
    }
  };

  const handleAiRequest = async () => {
    setInterviewStarted(true)

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: answerReviewPrompt || interviewQuestionsPrompt }
          ],
        }),
      });

      if (response.status === 504) {
        throw new Error('Сервер не відповів вчасно (504). Спробуйте пізніше або зменште кількість запитань.');
      }

      if (!response.ok) {
        throw new Error(`Сталася помилка: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data) return;

      if (answerReviewPrompt) {
        setAiFeedback(data.response.replace(/\*\*/g, '').trim())
        return;
      }

      setGeneratedQuestions(
        data.response
          .split('\n')
          .filter((line: string) => /^\d+\.\s/.test(line))
          .map((line: string) =>
            line
              .replace(/^\d+\.\s*/, '')
              .replace(/\*\*/g, '')
              .trim()
          )
      )
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Виникла невідома помилка. Спробуйте ще раз.');
      }
    }
  };

  const handleSpeakAi = () => {
    aiBubbleRef.current?.classList.add(stylesTalking['ai-container-active'])

    if (aiFeedback) {
      speakText({
        feedback: aiFeedback,
        language: selectedLanguage,
        aiBubbleRef,
        setIsSpeaking,
        setIsLastSpeaking
      });
      return;
    }

    speakText({
      question: currentQuestion,
      language: selectedLanguage,
      aiBubbleRef,
      setIsSpeaking,
      setIsLastSpeaking
    });
  }

  const handleNextQuestion = () => {
    currentQuestionIndexRef.current += 1;
    setCurrentAnswer('')
    setAiFeedback('')
    setIsLastSpeaking(false)
    speechSynthesis.cancel();

    if (currentQuestionIndexRef.current < generatedQuestions.length) {
      setShouldAdvanceQuestion(true)
    } else {
      handleStopInterview();
    }
  }

  const handleStopInterview = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
    setGeneratedQuestions([]);
    setAiFeedback('');
    setAnswerReviewPrompt('')
    setCurrentQuestion('');
    setCurrentAnswer('');
    setInterviewStarted(false);
    setIsLastSpeaking(false);
    setErrorMessage('')
  };

  return (
    <div className={styles.wrapper}>
      <Header />
      <InformationSpecialization hideInfo={interviewStarted} />
      <NavigationSettings onClick={handleAiRequest} hideSetting={interviewStarted} />
      <main className={styles.main}>
        {interviewStarted &&
          <>
            {generatedQuestions.length === 0
              ? (
                <section className={styles['block-loading']}>
                  {errorMessage ? (
                    <p className={styles['message-error']}>{errorMessage}</p>
                  ) : (
                    <p>Готуємо запитання для тренувальної співбесіди. Зачекай ще мить.</p>
                  )}
                  <div className={styles.strip}></div>
                </section>
              ) : (
                <section className={styles['section-content']}>
                  <>
                    {!errorMessage ? (
                      <>
                        <div className={(isRecording || isSpeaking || currentAnswer) ? `${styles['block-character']} ${styles.disabled}` : `${styles['block-character']}`}>
                          <TalkingCharacter speaker='ai' ref={aiBubbleRef} onClick={handleSpeakAi} />
                          <TalkingCharacter speaker='user' ref={userBubbleRef} onClick={handleVoiceRecordingToggle} />
                        </div>
                        <div className={styles['text-block']}>
                          <p className={styles.question}>{aiFeedback || currentQuestion}</p>
                          <p className={currentAnswer ? styles.answer : styles['answer-empty']}>{currentAnswer}</p>
                        </div>
                      </>
                    ) : (
                      <p className={styles['message-error']}>{errorMessage}</p>
                    )}
                  </>
                  <div className={styles['block-button']}>
                    <button onClick={handleNextQuestion}>Наступне питання</button>
                    <button onClick={handleStopInterview}>Закінчити співбесіду</button>
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
