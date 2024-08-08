import axios from 'axios';

const API_KEY = '97b0892e577542f8aecfe2c10897e6a9';

const uploadAudioFile = async (file) => {
  const formData = new FormData();
  formData.append('audio', file);

  try {
    const response = await axios.post('https://api.assemblyai.com/v2/upload', formData, {
      headers: {
        'authorization': API_KEY,
        'content-type': 'multipart/form-data'
      }
    });

    return response.data.upload_url;
  } catch (error) {
    console.error('Erro ao fazer upload do arquivo de áudio:', error);
    throw error;
  }
};

const transcribeAudioFile = async (audioUrl) => {
  try {
    const response = await axios.post('https://api.assemblyai.com/v2/transcript', {
      audio_url: audioUrl,
      language_code: 'pt'  // Adiciona a configuração de idioma para português
    }, {
      headers: {
        'authorization': API_KEY,
        'content-type': 'application/json'
      }
    });

    const transcriptId = response.data.id;
    return transcriptId;
  } catch (error) {
    console.error('Erro ao iniciar a transcrição:', error);
    throw error;
  }
};

const getTranscriptionResult = async (transcriptId) => {
  try {
    let status;
    let response;
    do {
      response = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
        headers: {
          'authorization': API_KEY
        }
      });
      status = response.data.status;
      console.log(`Status da transcrição: ${status}`);
      if (status !== 'completed') {
        await new Promise(res => setTimeout(res, 2000)); // Aguardar 2 segundos antes de verificar novamente
      }
    } while (status !== 'completed' && status !== 'failed');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter o resultado da transcrição:', error);
    throw error;
  }
};

export { uploadAudioFile, transcribeAudioFile, getTranscriptionResult };
