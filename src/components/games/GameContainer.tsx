import React from 'react';

interface GameContainerProps {
  children: React.ReactNode;
  progress: number;
}
const GameContainer: React.FC<GameContainerProps> = ({ children, progress }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-full max-w-6xl bg-gradient-to-br from-duolingoBlue via-duolingoBlueDark to-duolingoGreen rounded-lg shadow-lg p-6 flex flex-col h-3/4">
        <div className="flex-grow overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GameContainer;