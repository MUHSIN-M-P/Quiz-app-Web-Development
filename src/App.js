
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Homepage } from "./components/Homepage/Homepage";
import {Quiz} from "./components/Quiz/quiz";
import { Result } from "./components/Result/Result";
import { useState } from "react";
import { Options } from "./components/Options/Options";
function App() {
  const [apiUrl, setApiUrl] = useState(""); 
  const [quizData, setQuizData] = useState([]); 
  
  const [correct, setCorrect] = useState(0);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/options" element={<Options apiUrl={apiUrl} setApiUrl={setApiUrl} />} />
          <Route path="/quiz" element={<Quiz correct={correct} apiUrl={apiUrl} setCorrect={setCorrect} quizData={quizData} setQuizData={setQuizData}/>} />
        <Route path="/result" element={<Result correct={correct} quizData={quizData}/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
