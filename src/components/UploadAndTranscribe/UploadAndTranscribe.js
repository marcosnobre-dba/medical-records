// src/components/UploadAndTranscribe/UploadAndTranscribe.js
import React, { useState } from 'react';
import { PageContainer, Input, Transcript, Error } from './UploadAndTranscribe.styles';
import { uploadAudioFile, transcribeAudioFile, getTranscriptionResult } from '../../services/transcriptionService';

const UploadAndTranscribe = () => {
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setError('Nenhum arquivo selecionado.');
      return;
    }

    // Aceitar apenas formatos de áudio suportados
    const validFormats = ['audio/mpeg', 'audio/wav'];
    if (!validFormats.includes(file.type)) {
      setError('Formato de arquivo não suportado. Por favor, envie um arquivo MP3 ou WAV.');
      return;
    }

    setLoading(true);
    setError(null);
    setTranscription('');
    try {
      console.log('Fazendo upload do arquivo...');
      const audioUrl = await uploadAudioFile(file);
      console.log('Arquivo enviado. Iniciando transcrição...');
      const transcriptId = await transcribeAudioFile(audioUrl);
      console.log(`ID da transcrição: ${transcriptId}`);
      const transcriptionResult = await getTranscriptionResult(transcriptId);
      if (transcriptionResult.status === 'completed') {
        setTranscription(transcriptionResult.text);
      } else {
        setError('Falha na transcrição do áudio.');
      }
    } catch (err) {
      console.error('Erro ao transcrever o arquivo de áudio', err);
      setError(`Erro ao transcrever o arquivo de áudio: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Input type="file" accept="audio/mpeg, audio/wav" onChange={handleFileUpload} />
      {loading && <p>Carregando...</p>}
      {error && <Error>{error}</Error>}
      <Transcript>{transcription}</Transcript>
    </PageContainer>
  );
};

export default UploadAndTranscribe;
