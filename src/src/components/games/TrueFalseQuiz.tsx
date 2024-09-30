import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { decrementLives, incrementEnergy, incrementProgressPercentage } from '../../redux/actions/gameActions';
import { buttonStyles, typographyStyles } from '../../styles/styles';
import { TrueFalseQuizProps } from '../../types/Game';
import { useDecodeToken } from '../../hooks/useDecode';
import GameContainer from './GameContainer';
import { FiVolume2 } from 'react-icons/fi';

const TrueFalseQuiz: React.FC<TrueFalseQuizProps> = ({ questions, language, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showPopup, setShowPopup] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

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

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    const isAnswerCorrect = answer === currentQuestion.isTrue;

    setIsCorrect(isAnswerCorrect);
    setShowPopup(isAnswerCorrect ? "correct" : "incorrect");

    if (isAnswerCorrect) {
      dispatch(incrementEnergy(1));
      dispatch(incrementProgressPercentage(10));
      setPoints((prevPoints) => prevPoints + 10);
      
      setTimeout(() => {
        handleNextQuestion();
      }, 1500);
    } else {
      dispatch(decrementLives());
      setLives((prevLives) => prevLives - 1);
    }

    setProgress((prevProgress) => prevProgress + (100 / questions.length));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowPopup(null);
      setTimeLeft(15);
      setIsTimeUp(false);
    } else {
      onComplete(points);
    }
  };

  const handleQuizComplete = () => {
    onComplete(points);
  };

  const resetQuizState = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTimeLeft(15);
    setIsTimeUp(false);
    setShowPopup(null);
  };

  const handleBack = () => {
    router.push('/stages');
  };

  const playAudio = async () => {
    try {
      const response = await axios.post('/api/text-to-speech', {
        text: questions[currentQuestionIndex].statement,
        language: language,
      });
      setAudioUrl(response.data.audioUrl);
      const audio = new Audio(response.data.audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error fetching text-to-speech audio:", error);
    }
  };

  const progressBarWidth = (timeLeft / 15) * 100;

  return (
    <GameContainer lives={lives} points={points} progress={progress}>
      <div className="flex flex-col items-center justify-center text-white">
        <div className="w-full max-w-xl bg-gray-700 rounded-full h-2.5 my-4">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${progressBarWidth}%` }}
          />
        </div>

        <p className={`${typographyStyles.paragraph} mb-4`}>Time left: {timeLeft} seconds</p>
        <p className={`${typographyStyles.paragraph} mb-8 text-center`}>
          {questions[currentQuestionIndex].statement}
          <button onClick={playAudio} className="ml-2">
            <FiVolume2 />
          </button>
        </p>
        <div className="flex space-x-4 mb-4">
          <button
            className={`${buttonStyles.primary} ${
              selectedAnswer === true ? 'bg-blue-600' : ''
            }`}
            onClick={() => handleAnswer(true)}
            disabled={selectedAnswer !== null}
          >
            True
          </button>
          <button
            className={`${buttonStyles.primary} ${
              selectedAnswer === false ? 'bg-blue-600' : ''
            }`}
            onClick={() => handleAnswer(false)}
            disabled={selectedAnswer !== null}
          >
            False
          </button>
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
                  ? `Sorry, that's not correct. The correct answer is ${questions[currentQuestionIndex].isTrue ? "True" : "False"}.`
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

export default TrueFalseQuiz;