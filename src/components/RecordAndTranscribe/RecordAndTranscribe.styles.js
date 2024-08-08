// src/components/RecordAndTranscribe/RecordAndTranscribe.styles.js
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

export const Button = styled.button`
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 10px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:enabled {
    background-color: #3700b3;
  }
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
