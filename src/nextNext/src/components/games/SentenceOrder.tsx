import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { decrementLives, incrementEnergy, incrementProgressPercentage } from '../../redux/actions/gameActions';
import { buttonStyles, typographyStyles } from '../../styles/styles';
import { SentenceOrderProps } from '../../types/Game';
import { useDecodeToken } from '../../hooks/useDecode';
import GameContainer from './GameContainer';
import { FiVolume2 } from 'react-icons/fi';

const SentenceOrder: React.FC<SentenceOrderProps> = ({ questions, language, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
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
    resetQuiz();
  }, [currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft > 0 && !showPopup) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isTimeUp) {
      handleTimeout();
    }
  }, [timeLeft, showPopup, isTimeUp]);

  const handleTimeout = () => {
    setIsTimeUp(true);
    setShowPopup("lost");
    dispatch(decrementLives());
  };

  const handleWordClick = (word: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
      setAvailableWords([...availableWords, word]);
    } else {
      setSelectedWords([...selectedWords, word]);
      setAvailableWords(availableWords.filter((w) => w !== word));
    }
  };

  const handleSubmit = () => {
    const userAnswer = selectedWords.join(' ');
    const correctAnswer = questions[currentQuestionIndex].correctOrder.join(' ');

    if (userAnswer === correctAnswer) {
      setIsCorrect(true);
      setShowPopup("won");
      dispatch(incrementEnergy(1));
      dispatch(incrementProgressPercentage(10));
      setPoints((prevPoints) => prevPoints + 10);
    } else {
      setIsCorrect(false);
      setShowPopup("lost");
      dispatch(decrementLives());
      setLives((prevLives) => prevLives - 1);
    }

    setProgress((prevProgress) => prevProgress + (100 / questions.length));
  };

  const handleQuizComplete = () => {
    onComplete(points);
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

  const resetQuiz = () => {
    setSelectedWords([]);
    if (questions[currentQuestionIndex] && questions[currentQuestionIndex].options) {
      setAvailableWords([...questions[currentQuestionIndex].options].sort(() => Math.random() - 0.5));
    }
    setIsCorrect(null);
    setTimeLeft(15);
    setIsTimeUp(false);
    setShowPopup(null);
  };

  const handleTextToSpeech = async () => {
    try {
      const response = await axios.post(
        "/api/sound/text-to-speech",
        { text: questions[currentQuestionIndex].correctOrder.join(' ') }
      );

      const { url } = response.data;
      setAudioUrl(url);

      const audio = new Audio(url);
      audio.play();
    } catch (error) {
      console.error("Error fetching text-to-speech audio:", error);
    }
  };

  const progressBarWidth = (timeLeft / 15) * 100;

  return (
    <GameContainer lives={lives} points={points} progress={progress}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className={`${typographyStyles.heading2} mb-8`}>Sentence Order</h1>
        <div className="w-full max-w-xl bg-gray-700 rounded-full h-2.5 mb-4">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${progressBarWidth}%` }}
          />
        </div>
        <p className={`${typographyStyles.paragraph} mb-4`}>Time left: {timeLeft} seconds</p>
        <div className="flex items-center mb-4">
          <p className={`${typographyStyles.paragraph} mr-2`}>Arrange the words to form a correct sentence:</p>
          <button
            className="p-2 rounded-full text-duolingoBlue"
            onClick={handleTextToSpeech}
          >
            <FiVolume2 className="text-2xl" />
          </button>
        </div>
        <div className="mb-4">
          <h2 className={typographyStyles.heading3}>Selected Words:</h2>
          <div className="flex flex-wrap gap-2">
            {selectedWords.map((word, index) => (
              <button
                key={index}
                className={buttonStyles.primary}
                onClick={() => handleWordClick(word, true)}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h2 className={typographyStyles.heading3}>Available Words:</h2>
          <div className="flex flex-wrap gap-2">
            {availableWords.map((word, index) => (
              <button
                key={index}
                className={buttonStyles.secondary}
                onClick={() => handleWordClick(word, false)}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
        <button
          className={`${buttonStyles.primary} mt-4`}
          onClick={handleSubmit}
          disabled={selectedWords.length !== questions[currentQuestionIndex].correctOrder.length}
        >
          Submit
        </button>
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className={`${typographyStyles.heading3} mb-4`}>
                {showPopup === "won" ? "Correct!" : "Incorrect!"}
              </h2>
              <p className={`${typographyStyles.paragraph} mb-4`}>
                {showPopup === "won"
                  ? "Great job! You arranged the sentence correctly."
                  : `Sorry, that's not correct. The correct sentence is: ${questions[currentQuestionIndex].correctOrder.join(' ')}`}
              </p>
              <button
                className={`${buttonStyles.primary} px-6 py-2`}
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

export default SentenceOrder;