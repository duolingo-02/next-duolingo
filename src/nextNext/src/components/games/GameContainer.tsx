import React from 'react';
import { FaHeart, FaEuroSign } from 'react-icons/fa';

interface GameContainerProps {
  children: React.ReactNode;
  lives: number;
  points: number;
  progress: number;
}

const GameContainer: React.FC<GameContainerProps> = ({ children, lives, points, progress }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center w-full mb-4">
          <div className="flex items-center">
            <FaHeart className="text-red-500 mr-1" />
            <span>{lives}</span>
          </div>
          <div className="flex items-center">
            <FaEuroSign className="text-yellow-500 mr-1" />
            <span>{points}</span>
          </div>
          <div className="w-1/2 bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default GameContainer;