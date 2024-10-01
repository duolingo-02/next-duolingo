import React, { useState, useEffect } from 'react';
import { FiVolume2 } from 'react-icons/fi';
import axios from 'axios';
import { buttonStyles, typographyStyles } from '../../styles/styles';
import GameContainer from './GameContainer';
import { SentenceOrderQuizProps } from '../../types/Game';

const SentenceOrder: React.FC<SentenceOrderQuizProps> = ({
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
  const [timeLeft, setTimeLeft] = useState(60);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
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
    <GameContainer progress={progress}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-8 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8">Sentence Order Quiz</h1>
        <div className="w-full max-w-xl bg-gray-700 rounded-full h-3 mb-6 overflow-hidden">
          <div
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${(timeLeft / 60) * 100}%` }}
          />
        </div>
        <p className="text-xl text-cyan-300 mb-6">Time left: {timeLeft} seconds</p>
        <div className="flex items-center mb-8 bg-opacity-20 bg-white p-6 rounded-xl backdrop-filter backdrop-blur-lg">
          <p className="text-2xl font-semibold text-white mr-4">{question}</p>
          <button
            className="p-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
            onClick={handleTextToSpeech}
          >
            <FiVolume2 className="text-2xl" />
          </button>
        </div>
        <div className="mb-8 w-full max-w-2xl">
          <div className="flex flex-wrap justify-center mb-4">
            {selectedWords.map((word, index) => (
              <button
                key={index}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-xl m-1 transition-all duration-200 transform hover:scale-105"
                onClick={() => handleWordDeselect(word)}
              >
                {word}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center">
            {availableWords.map((word, index) => (
              <button
                key={index}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-2 px-4 rounded-xl m-1 transition-all duration-200 transform hover:scale-105"
                onClick={() => handleWordSelect(word)}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
        <button
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105"
          onClick={handleSubmit}
          disabled={selectedWords.length !== correctOrder.length}
        >
          Submit Answer
        </button>
        {isCorrect !== null && (
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

export default SentenceOrder;