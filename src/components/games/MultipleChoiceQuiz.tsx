import React, { useState } from 'react';
import axios from 'axios';
import { FiVolume2 } from 'react-icons/fi';
import { buttonStyles, typographyStyles } from '../../styles/styles';
import GameContainer from './GameContainer';

interface MultipleChoiceQuizProps {
  question: string;
  options: string[];
  correctAnswer: string;
  language: string;
  onAnswer: (isCorrect: boolean) => void;
  onNextOrRestart: () => void;
  onBack: () => void;
  isCorrect: boolean | null;
  lives: number;
  points: number;
  progress: number;
}

const MultipleChoiceQuiz: React.FC<MultipleChoiceQuizProps> = ({
  question,
  options,
  correctAnswer,
  language,
  onAnswer,
  onNextOrRestart,
  onBack,
  isCorrect,
  lives,
  points,
  progress
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    onAnswer(answer === correctAnswer);
  };

  const handleTextToSpeech = async () => {
    try {
      const response = await axios.post('/api/text-to-speech', {
        text: question,
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
        <h1 className={`${typographyStyles.heading2} mb-8`}>Multiple Choice Quiz</h1>
        <div className="w-full max-w-xl bg-gray-700 rounded-full h-2.5 mb-4">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${(timeLeft / 30) * 100}%` }}
          />
        </div>
        <p className={`${typographyStyles.paragraph} mb-4`}>Time left: {timeLeft} seconds</p>
        <div className="flex items-center mb-4">
          <p className={`${typographyStyles.paragraph} mr-2`}>{question}</p>
          <button
            className="p-2 rounded-full text-duolingoBlue"
            onClick={handleTextToSpeech}
          >
            <FiVolume2 className="text-2xl" />
          </button>
        </div>
        <div className="flex flex-col space-y-4 mb-4">
          {options.map((option, index) => (
            <button
              key={index}
              className={`${buttonStyles.primary} ${
                selectedAnswer === option ? (isCorrect ? 'bg-green-500' : 'bg-red-500') : ''
              }`}
              onClick={() => handleAnswer(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
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

export default MultipleChoiceQuiz;