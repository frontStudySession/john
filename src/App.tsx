import React from "react";
import "./App.css";
import { Hello } from "@app/hello";
import DefaultForm from "@components/form/DefaultForm";

function App() {
  return (
    <div className="App">
      <Hello></Hello>
      <DefaultForm></DefaultForm>
    </div>
  );
}

export default App;
