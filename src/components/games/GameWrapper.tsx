// GameWrapper.tsx
import React from "react";
import { GameWrapperProps } from "../../types/types"; // Import the updated type
import GameBar from "./GameBar";

/**
 * GameWrapper Component
 *
 * Wraps the children components with the GameBar.
 */
const GameWrapper: React.FC<GameWrapperProps> = ({ children, initialTimerValue }) => {
  return (
    <div className="flex flex-col min-h-screen bg-duolingoDark">
      <div className="w-full max-w-7xl mx-auto">
        <GameBar initialTimerValue={initialTimerValue} lives={3} points={0} progress={0} />
      </div>
      <div className="flex-grow flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
};;

export default GameWrapper;