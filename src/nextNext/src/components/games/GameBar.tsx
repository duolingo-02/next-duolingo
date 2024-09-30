import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store/store";
import Image from "next/image";
import { incrementLives } from "../../redux/actions/gameActions";

interface GameBarProps {
  initialTimerValue: number;
}

const GameBar: React.FC<GameBarProps> = ({ initialTimerValue }) => {
  const dispatch = useDispatch();
  const lives = useSelector((state: RootState) => state.game.lives);
  const coins = useSelector((state: RootState) => state.game.coins);
  const extraLives = useSelector((state: RootState) => state.game.extraLives);
  const userProfile = useSelector((state: RootState) => state.user.profile);
  const progressPercentage = useSelector((state: RootState) => state.game.progressPercentage);

  const [isOverallProgress, setIsOverallProgress] = useState(true);
  const [timerValue, setTimerValue] = useState(initialTimerValue);

  const overallProgress = userProfile ? (userProfile.totalPoints / 3).toFixed(2) : 0;

  const toggleProgressView = () => {
    setIsOverallProgress(!isOverallProgress);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    setTimerValue(initialTimerValue);
  }, [initialTimerValue]);

  useEffect(() => {
    if (timerValue > 0) {
      const timer = setInterval(() => {
        setTimerValue(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timerValue === 0 && lives < extraLives.max) {
      dispatch(incrementLives());
      setTimerValue(initialTimerValue);
    }
  }, [timerValue, dispatch, extraLives.max, initialTimerValue, lives]);

return (
  <div className="w-full bg-duolingoDark2 p-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      {/* Left section: Logo and menu */}
      <div className="flex items-center space-x-4">
        <Image src="/assets/logo.png" alt="LingoLeap Logo" width={40} height={40} />
        <button className="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Center section: Game stages */}
      <div className="flex items-center space-x-4 bg-duolingoDark rounded-full px-6 py-2 shadow-lg">
        {/* Lives Section */}
        <div className="flex items-center space-x-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center">
              {index < lives ? (
                <Image src="/assets/icons/coeur.svg" alt="Heart" width={24} height={24} className="w-6 h-6" />
              ) : (
                <Image src="/assets/icons/toxique.svg" alt="Dead" width={24} height={24} className="w-6 h-6" />
              )}
            </div>
          ))}
          <span className="font-bold text-white ml-2">
            {lives}/{extraLives.max}
          </span>
        </div>

        {/* Progress Section */}
        <div className="flex items-center">
          <div className="relative w-40 h-6 bg-gray-200 rounded-full">
            <div
              className="absolute left-0 h-full bg-green-500 rounded-full"
              style={{ width: `${isOverallProgress ? overallProgress : progressPercentage}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-white text-sm">
              {isOverallProgress ? `${overallProgress}%` : `${progressPercentage}%`}
            </span>
          </div>
          <button
            onClick={toggleProgressView}
            className="ml-2 text-sm text-white underline"
          >
            {isOverallProgress ? "Language" : "Overall"}
          </button>
        </div>

        {/* Coins Section */}
        <div className="flex items-center">
          <Image src="/assets/icons/euro.svg" alt="Coin" width={24} height={24} className="w-6 h-6" />
          <span className="ml-2 font-bold text-white">{coins}</span>
        </div>
      </div>

      {/* Right section: Timer */}
      <div className="text-white font-bold">
        {lives < 5 && formatTime(timerValue)}
      </div>
    </div>
  </div>
);;
};

export default GameBar;