import React from "react";
import { Link } from "react-router-dom";
import "./Result.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export const Result = ({ correct, quizData }) => {
  console.log(quizData);
  return (
    <div className="result">
      <div className="result-card">
        <CircularProgressbar
          value={correct}
          maxValue={10}
          text={`${correct}/10`}
          styles={buildStyles({
            pathColor: "rgb(12, 207, 5)",
            textColor: "rgb(12, 207, 5)",
          })}
        />
        <div className="text">Correct</div>
      </div>
      <button className="retry">
        <Link
          to={"/quiz"}
          style={{
            textDecoration: "none",
            color: "white",
            width: "fitContent",
          }}
        >
          Try again
        </Link>
      </button>
      <div className="answers-section">
          <h1>Answers</h1>
      {quizData.map((item) => {
        return (<div className="answers">
          <p>{item.question}</p>
          <p id="correct-answer">{item.correct_answer}</p>
        </div>)
      })}
      </div>
    </div>
  );
};
