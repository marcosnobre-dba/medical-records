// src/components/UploadAndTranscribe/UploadAndTranscribe.styles.js
import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 800px;
  margin: 20px auto;
`;

export const Input = styled.input`
  margin: 10px;
  padding: 10px;
  font-size: 16px;
`;

export const Transcript = styled.p`
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

export const Error = styled.p`
  color: red;
  font-weight: bold;
`;
