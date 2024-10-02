import React from 'react';
import Image from 'next/image';

interface AchievementProps {
  id: string;
  name: string;
  isUnlocked: boolean;
  level: 'bronze' | 'silver' | 'gold' | 'diamond' | 'ruby' | 'special';
  requiredPoints: number;
  userPoints: number;
}

const AchievementItem: React.FC<AchievementProps> = ({ id, name, isUnlocked, level, requiredPoints, userPoints }) => {
  const achievementImage = "https://cdn-icons-png.flaticon.com/512/8810/8810361.png";

  const progressPercentage = Math.min((userPoints / requiredPoints) * 100, 100);

  return (
    <div className={`relative p-6 rounded-lg shadow-lg bg-blue-700 text-white transition-all duration-300 hover:scale-105`}>
      <div className="flex items-center justify-center mb-4">
        <Image
          src={achievementImage}
          alt={name}
          width={80}
          height={80}
          className={isUnlocked ? "opacity-100" : "opacity-50"}
        />
      </div>
      <h2 className="text-xl font-semibold text-center mb-2">{name}</h2>
      <p className="text-center mb-2">Required: {requiredPoints} points</p>
      <div className="w-full bg-blue-900 rounded-full h-2.5 mb-4">
        <div 
          className="bg-green-400 h-2.5 rounded-full" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      {!isUnlocked && (
        <div className="absolute top-2 right-2">
          {/* <Image
            src="/images/lock-icon.png"
            alt=""
            width={24}
            height={24}
          /> */}
        </div>
      )}
      <p className={`text-center ${isUnlocked ? 'text-green-400 font-semibold' : 'text-blue-200'}`}>
        {isUnlocked ? 'Unlocked' : `${userPoints}/${requiredPoints} points`}
      </p>
    </div>
  );
};

export default AchievementItem;