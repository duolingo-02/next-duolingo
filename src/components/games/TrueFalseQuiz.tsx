import React, { useState } from 'react';
import { FiVolume2 } from 'react-icons/fi';
import axios from 'axios';
import { buttonStyles, typographyStyles } from '../../styles/styles';
import GameContainer from './GameContainer';

interface TrueFalseQuizProps {
  statement: string;
  isTrue: boolean;
  language: string;
  onAnswer: (isCorrect: boolean) => void;
  onNextOrRestart: () => void;
  onBack: () => void;
  isCorrect: boolean | null;
  lives: number;
  points: number;
  progress: number;
}

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
    <GameContainer lives={lives} points={points} progress={progress}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className={`${typographyStyles.heading2} mb-8`}>True or False Quiz</h1>
        <div className="w-full max-w-xl bg-gray-700 rounded-full h-2.5 mb-4">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${(timeLeft / 15) * 100}%` }}
          />
        </div>
        <p className={`${typographyStyles.paragraph} mb-4`}>Time left: {timeLeft} seconds</p>
        <div className="flex items-center mb-4">
          <p className={`${typographyStyles.paragraph} mr-2`}>{statement}</p>
          <button
            className="p-2 rounded-full text-duolingoBlue"
            onClick={handleTextToSpeech}
          >
            <FiVolume2 className="text-2xl" />
          </button>
        </div>
        <div className="flex space-x-4 mb-4">
          <button
            className={`${buttonStyles.primary} ${
              selectedAnswer === true ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : ''
            }`}
            onClick={() => handleAnswer(true)}
            disabled={selectedAnswer !== null}
          >
            True
          </button>
          <button
            className={`${buttonStyles.primary} ${
              selectedAnswer === false ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : ''
            }`}
            onClick={() => handleAnswer(false)}
            disabled={selectedAnswer !== null}
          >
            False
          </button>
        </div>
        {selectedAnswer !== null && (
          <div className="mt-4">
            <p className={`${typographyStyles.paragraph} mb-4`}>
              {isCorrect ? "Correct!" : "Incorrect!"}
            </p>
            <button
              className={`${buttonStyles.secondary} px-6 py-2`}
              onClick={onNextOrRestart}
            >
              {isCorrect ? "Next Question" : "Restart Level"}
            </button>
          </div>
        )}
        <button className={`${buttonStyles.secondary} mt-4`} onClick={onBack}>
          Back to Stage Selection
        </button>
      </div>
      {audioUrl && <audio src={audioUrl} autoPlay />}
    </GameContainer>
  );
};

export default TrueFalseQuiz;