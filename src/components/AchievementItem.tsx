import React from 'react';
import Image from 'next/image';
import { Achievement } from '@prisma/client';

interface AchievementItemProps {
  achievement: Achievement;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ achievement }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <Image
        src={achievement.picture || '/default-achievement.png'}
        alt={achievement.title}
        width={100}
        height={100}
        className="mx-auto mb-4"
      />
      <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
      <p className="text-gray-600 mb-2">{achievement.description}</p>
      <p className="text-lg font-semibold text-duolingoGreen">
        {achievement.points} points
      </p>
    </div>
  );
};

export default AchievementItem;