import React, { useState, useEffect } from 'react';
import './quiz.css'
import { Link } from 'react-router-dom';



export const Quiz = ({apiUrl, correct, setCorrect,quizData,setQuizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [selectedAnswer, setSelectedAnswer] = useState(''); 
  const [selectedElement, setSelectedElement] = useState(''); 
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [sortedOptions, setSortedOptions] = useState([]);

  useEffect(() => {

      fetch(apiUrl)
       .then((response) => response.json())
       .then((data) => {
        setQuizData(data.results);
       })
       .catch((error) => {
        console.error("Error fetching the quiz data:", error);
       });
      }, [setQuizData,apiUrl]);
      // the above method is used to direct fetching data from api . for from backend use the following 
      // Don't forget to run node index.js in backend to work => use 2 terminals 
     //  async function fetchData() {
     //    try {
     //      const response = await axios.get('http://localhost:5000/quiz');
     //      setQuizData(response.data.results);
     //   } catch (error) {
     //      console.log('Error in front end Axios fetching');
     //   }
     // }
     //  fetchData();
  

  useEffect(() => {
    if (quizData.length > 0 && currentQuestionIndex < quizData.length) {
      const currentQuestion = quizData[currentQuestionIndex];
      const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
      setSortedOptions(options.sort(() => Math.random() - 0.5));
    }
  }, [quizData, currentQuestionIndex]);

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
    setSelectedElement(e.target)
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (selectedAnswer === quizData[currentQuestionIndex].correct_answer) {
      setCorrect(correct + 1);
    }
    if(selectedAnswer!== currentQuestion.correct_answer){
      selectedElement.parentElement.parentElement.setAttribute('id','incorrect')
    }
    var answer = Array.from(document.getElementsByTagName('label')).filter(element => element.textContent.includes(currentQuestion.correct_answer));
    answer[0].parentElement.setAttribute('id','correct')

    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedAnswer(''); 
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      answer[0].parentElement.removeAttribute('id')
      answer =[]
      selectedElement.parentElement.parentElement.removeAttribute('id')
      setSelectedElement('')
      // Move to the next question
    }, 1000); 
  };

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className='quiz-container'>
      {quizData.length > 0 && currentQuestionIndex < quizData.length ? (
        <div>
          <p><strong>Q{currentQuestionIndex + 1}:</strong> {currentQuestion.question}</p>
          <ul>
            {sortedOptions.map((answer, i) => (
              <li key={i} className={isSubmitted && answer === currentQuestion.correct_answer ? 'correct' : isSubmitted && answer === selectedAnswer ? 'incorrect' : ''}>
                <label>
                  <input
                    type="radio"
                    value={answer}
                    checked={selectedAnswer === answer}
                    onChange={handleAnswerChange}
                    disabled={isSubmitted} 
                  />
                  {answer}
                </label>
              </li>
            ))}
          </ul>
          <button id='submit-btn' onClick={handleSubmit} disabled={!selectedAnswer || isSubmitted}>
            Submit Answer
          </button>
        </div>
      ) : (
        <div className='completed'>
          <p className='completed-text'>{quizData.length > 0 ? "Quiz Completed!" : "Loading questions..."}</p>
          {quizData.length === 10 && (
            <button className='result-btn'>
              <Link
                to={{
                  pathname: '/result',
                  state: { value: correct }
                }}
                style={{ textDecoration: 'none', color: 'white', whiteSpace: 'nowrap' }}
              >
                Go to the Result
              </Link>
            </button>
          )}
        </div>
      )}
    </div>
  );
};