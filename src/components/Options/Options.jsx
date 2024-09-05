import React, { useEffect, useState } from "react";
import "./Options.css";
import { Link } from "react-router-dom";

export const Options = ({apiUrl,setApiUrl}) => {
  const [options, setOptions] = useState(null);
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [category, setCategory] = useState("any");
  const [difficulty, setDifficulty] = useState("any");
  const [questionType, setQuestionType] = useState("any");


  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => {
        setOptions(data.trivia_categories);
      });
  }, []);

  const handleCategory = (e) => setCategory(e.target.value);
  const handleAmount = (e) => setNumberOfQuestions(e.target.value);
  const handleDifficulty = (e) => setDifficulty(e.target.value);
  const handleType = (e) => setQuestionType(e.target.value);

  const makeApi = () => {
    let basicURL = `https://opentdb.com/api.php?amount=${numberOfQuestions}`;
    if (category !== "any") {
      basicURL += `&category=${category}`;
    }
    if (difficulty !== "any") {
      basicURL += `&difficulty=${difficulty}`;
    }
    if (questionType !== "any") {
      basicURL += `&type=${questionType}`;
    }

    setApiUrl(basicURL); 
    console.log("Generated URL:", basicURL);
  };

  return (
    <div className="options-container">
      {options ? (
        <div>
          <h1 className="option-h1">Customize the Questions</h1>

          <h3>Select Category :</h3>
          <select
            name="category"
            id="category"
            value={category}
            onChange={handleCategory}
          >
            <option value="any">All</option>
            {options.map((option) => (
              <option key={option.id} value={option.id} id={option.id}>
                {option.name}
              </option>
            ))}
          </select>

          <h3>Select Difficulty:</h3>
          <select
            name="difficulty"
            id="difficulty-level"
            value={difficulty}
            onChange={handleDifficulty}
          >
            <option value="any">All</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <h3>Select Question Type:</h3>
          <select
            name="question-type"
            id="question-type"
            value={questionType}
            onChange={handleType}
          >
            <option value="any">All</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>

          <h3>Amount of Questions :</h3>
          <input
            type="number"
            value={numberOfQuestions}
            onChange={handleAmount}
          />

          <Link
            to="/quiz"
            state={{ apiUrl }} 
            style={{
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            onClick={makeApi} 
          >
            <button id="start-quiz">Start Quiz</button>
          </Link>
        </div>
      ) : (
        <div className="loading">
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};
