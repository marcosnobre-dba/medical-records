// src/components/RecordAndTranscribe/RecordAndTranscribe.js
import React, { useState } from 'react';
import { PageContainer, Button, Transcript } from './RecordAndTranscribe.styles.js';

const RecordAndTranscribe = () => {
  const [transcription, setTranscription] = useState('');
  const [listening, setListening] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'pt-BR';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = 0; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcriptSegment + ' ';
        } else {
          interimTranscript += transcriptSegment;
        }
      }

      setTranscription(finalTranscript + interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Erro no reconhecimento de fala: ' + event.error);
      recognition.stop();
    };
  } else {
    console.error('API de reconhecimento de fala não é suportada neste navegador.');
  }

  const requestMicrophoneAccess = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      startListening();
    } catch (err) {
      console.error('Erro ao acessar o microfone', err);
    }
  };

  const startListening = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      setListening(false);
      recognition.stop();
    }
  };

  return (
    <PageContainer>
      <Button onClick={requestMicrophoneAccess} disabled={listening}>
        Iniciar Gravação
      </Button>
      <Button onClick={stopListening} disabled={!listening}>
        Parar Gravação
      </Button>
      <Transcript>{transcription}</Transcript>
    </PageContainer>
  );
};

export default RecordAndTranscribe;