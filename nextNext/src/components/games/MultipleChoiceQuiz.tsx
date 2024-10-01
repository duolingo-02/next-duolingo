import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { decrementLives, incrementEnergy, incrementProgressPercentage } from '../../redux/actions/gameActions';
import { buttonStyles, typographyStyles } from '../../styles/styles';
import { MultipleChoiceQuizProps } from '../../types/Game';
import { useDecodeToken } from '../../hooks/useDecode';
import GameContainer from './GameContainer';

const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({ questions, language, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  const router = useRouter();
  const decodedToken = useDecodeToken();
  const userId = decodedToken && 'userId' in decodedToken ? decodedToken.userId : null;

  useEffect(() => {
    if (timeLeft > 0 && !showPopup) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isTimeUp) {
      setIsTimeUp(true);
      setShowPopup("timeout");
      dispatch(decrementLives());
    }
  }, [timeLeft, showPopup, isTimeUp, dispatch]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect = answer === currentQuestion.answer;

    setIsCorrect(isAnswerCorrect);
    setShowPopup(isAnswerCorrect ? "correct" : "incorrect");

    if (isAnswerCorrect) {
      dispatch(incrementEnergy(1));
      dispatch(incrementProgressPercentage(10));
      setPoints((prevPoints) => prevPoints + 10);
      
      // Use setTimeout to delay the transition to the next question
      setTimeout(() => {
        handleNextQuestion();
      }, 1500); // Delay of 1.5 seconds
    } else {
      dispatch(decrementLives());
      setLives((prevLives) => prevLives - 1);
    }

    setProgress((prevProgress) => prevProgress + (100 / questions.length));
  };

  const handleQuizComplete = () => {
    onComplete(points);
  };
  
  const resetQuiz = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTimeLeft(30);
    setIsTimeUp(false);
    setShowPopup(null);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      resetQuiz();
    } else {
      handleQuizComplete();
    }
  };
  
  const handleBack = () => {
    router.push(`/language/${language}/stage-selection`);
  };

  return (
    <GameContainer lives={lives} points={points} progress={progress}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className={`${typographyStyles.heading2} mb-8`}>Multiple Choice Quiz</h1>
        <div className="w-full max-w-xl bg-gray-700 rounded-full h-2.5 mb-4">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          />
        </div>
        <p className={`${typographyStyles.paragraph} mb-4`}>Time left: {timeLeft} seconds</p>
        <div className="flex items-center mb-4">
        <p className={`${typographyStyles.paragraph} mr-2`}>{questions[currentQuestionIndex].question}</p>
        </div>
        <div className="flex flex-col space-y-4 mb-4">
        {questions[currentQuestionIndex].options.map((option: string, index: number) => (
            <button
              key={index}
              className={`${buttonStyles.primary} ${
                selectedAnswer === option ? 'bg-blue-600' : ''
              }`}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedAnswer}
            >
              {option}
            </button>
          ))}
        </div>
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className={`${typographyStyles.heading3} mb-4`}>
                {showPopup === "correct" ? "Correct!" : showPopup === "incorrect" ? "Incorrect!" : "Time's up!"}
              </h2>
              <p className={`${typographyStyles.paragraph} mb-4`}>
                {showPopup === "correct"
                  ? "Great job! You got it right."
                  : showPopup === "incorrect"
                  ? `Sorry, that's not correct. The correct answer is ${questions[currentQuestionIndex].answer}.`
                  : "You ran out of time!"}
              </p>
              <button
                className={`${buttonStyles.secondary} px-6 py-2`}
                onClick={handleNextQuestion}
              >
                {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
              </button>
            </div>
          </div>
        )}
        <button className={`${buttonStyles.secondary} mt-4`} onClick={handleBack}>
          Back to Stage Selection
        </button>
      </div>
    </GameContainer>
  );
};

export default MultipleChoiceQuiz;