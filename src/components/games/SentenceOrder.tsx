import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiVolume2 } from 'react-icons/fi';
import { buttonStyles, typographyStyles } from '../../styles/styles';
import GameContainer from './GameContainer';

interface SentenceOrderProps {
  question: string;
  scrambledSentence: string[];
  correctOrder: string[];
  language: string;
  onAnswer: (isCorrect: boolean) => void;
  onNextOrRestart: () => void;
  onBack: () => void;
  isCorrect: boolean | null;
  lives: number;
  points: number;
  progress: number;
}

const SentenceOrder: React.FC<SentenceOrderProps> = ({
  question,
  scrambledSentence,
  correctOrder,
  language,
  onAnswer,
  onNextOrRestart,
  onBack,
  isCorrect,
  lives,
  points,
  progress
}) => {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(scrambledSentence);
  const [timeLeft, setTimeLeft] = useState(30);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleWordSelect = (word: string) => {
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter(w => w !== word));
  };

  const handleWordDeselect = (word: string) => {
    setSelectedWords(selectedWords.filter(w => w !== word));
    setAvailableWords([...availableWords, word]);
  };

  const handleSubmit = () => {
    const isAnswerCorrect = selectedWords.join(' ') === correctOrder.join(' ');
    onAnswer(isAnswerCorrect);
  };

  const handleTextToSpeech = async () => {
    try {
      const response = await axios.post('/api/text-to-speech', {
        text: correctOrder.join(' '),
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
        <h1 className={`${typographyStyles.heading2} mb-8`}>Sentence Order</h1>
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
        <div className="mb-4">
          {selectedWords.map((word, index) => (
            <button
              key={index}
              className={`${buttonStyles.primary} m-1`}
              onClick={() => handleWordDeselect(word)}
            >
              {word}
            </button>
          ))}
        </div>
        <div className="mb-4">
          {availableWords.map((word, index) => (
            <button
              key={index}
              className={`${buttonStyles.secondary} m-1`}
              onClick={() => handleWordSelect(word)}
            >
              {word}
            </button>
          ))}
        </div>
        <button
          className={`${buttonStyles.primary} px-6 py-2 mb-4`}
          onClick={handleSubmit}
          disabled={selectedWords.length !== correctOrder.length}
        >
          Submit
        </button>
        {isCorrect !== null && (
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

export default SentenceOrder;