// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import RecordAndTranscribe from './components/RecordAndTranscribe/RecordAndTranscribe';
import UploadAndTranscribe from './components/UploadAndTranscribe/UploadAndTranscribe';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  color: #6200ee;
  margin-bottom: 20px;
`;

const NavBar = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #6200ee;
  padding: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  justify-content: center;
`;

const NavLinkStyled = styled(NavLink)`
  margin: 0 15px;
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 18px;

  &:hover {
    color: #ffcc00;
  }

  &.active {
    border-bottom: 2px solid #ffcc00;
  }
`;

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <NavBar>
        <NavLinkStyled to="/" exact>
          Gravar & Transcrever
        </NavLinkStyled>
        <NavLinkStyled to="/upload">
          Upload & Transcrever
        </NavLinkStyled>
      </NavBar>
      <AppContainer>
        <Title>Registros Médicos</Title>
        <Routes>
          <Route exact path="/" element={<RecordAndTranscribe />} />
          <Route path="/upload" element={<UploadAndTranscribe />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
