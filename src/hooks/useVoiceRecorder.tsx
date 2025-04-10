'use client'
import { useState, useCallback, useEffect } from 'react';

type TypeVoiceRecorderParams = {
  languageChoice: string;
};

export const useVoiceRecorder = ({ languageChoice }: TypeVoiceRecorderParams) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.lang = languageChoice;
        setRecognition(recognitionInstance);
      }
    }
  }, [languageChoice]);

  useEffect(() => {
    if (!recognition) return;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };
  }, [recognition]);

  const startRecording = useCallback(() => {
    if (recognition) {
      setTranscript(''); 
      recognition.start();
    }
  }, [recognition]);

  const stopRecording = useCallback(() => {
    if (recognition) {
      recognition.stop();
    }
  }, [recognition]);

  return {
    isRecording,
    transcript,
    startRecording,
    stopRecording,
  };
};