import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Hello } from "@/app/hello";
import styled from 'styled-components';

const StyledDiv = styled.div`
  color: red;
  font-size: 20px;
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Hello />
        <StyledDiv>
          존입니다!
        </StyledDiv>
      </header>
    </div>
  );
}

export default App;
