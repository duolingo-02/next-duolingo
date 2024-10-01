import React, { useState, useEffect } from 'react';
import { FiVolume2 } from 'react-icons/fi';
import axios from 'axios';
import { buttonStyles, typographyStyles } from '../../styles/styles';
import GameContainer from './GameContainer';
import { TrueFalseQuizProps } from '../../types/Game';

const TrueFalseQuiz: React.FC<TrueFalseQuizProps> = ({
  statement,
  isTrue,
  language,
  onAnswer,
  onNextOrRestart,
  onBack,
  isCorrect,
  lives,
  points,
  progress
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    onAnswer(answer === isTrue);
  };

  const handleTextToSpeech = async () => {
    try {
      const response = await axios.post('/api/text-to-speech', {
        text: statement,
        language: language,
      });
      setAudioUrl(response.data.audioUrl);
      const audio = new Audio(response.data.audioUrl);
      audio.play();
    } catch (error) {
      console.error("Error fetching text-to-speech audio:", error);
    }
  };

  return (
    <GameContainer progress={progress}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8">True or False Quiz</h1>
        <div className="w-full max-w-xl bg-gray-700 rounded-full h-3 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          />
        </div>
        <p className="text-xl text-cyan-300 mb-6">Time left: {timeLeft} seconds</p>
        <div className="flex items-center mb-8 bg-opacity-20 bg-white p-6 rounded-xl backdrop-filter backdrop-blur-lg">
          <p className="text-2xl font-semibold text-white mr-4">{statement}</p>
          <button
            className="p-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
            onClick={handleTextToSpeech}
          >
            <FiVolume2 className="text-2xl" />
          </button>
        </div>
        <div className="flex space-x-6 mb-8">
          {['True', 'False'].map((option) => (
            <button
              key={option}
              className={`${buttonStyles.primary} ${
                selectedAnswer === (option === 'True')
                  ? isCorrect
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-500 hover:bg-red-600'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
              } text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105`}
              onClick={() => handleAnswer(option === 'True')}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
        {selectedAnswer !== null && (
          <div className="text-center mt-6">
            <p className={`text-2xl font-bold mb-4 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
              {isCorrect ? "Correct!" : "Incorrect!"}
            </p>
            <button
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105"
              onClick={onNextOrRestart}
            >
              {isCorrect ? "Next Question" : "Restart Level"}
            </button>
          </div>
        )}
        <button 
          className="mt-8 bg-opacity-20 bg-white text-white font-semibold py-2 px-6 rounded-lg hover:bg-opacity-30 transition-all duration-200"
          onClick={onBack}
        >
          Back to Stage Selection
        </button>
      </div>
      {audioUrl && <audio src={audioUrl} autoPlay />}
    </GameContainer>
  );
};

export default TrueFalseQuiz;