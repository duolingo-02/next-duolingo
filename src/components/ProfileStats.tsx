import React from 'react';

interface ProfileStatsProps {
  stats: {
    lessonsCompleted: number;
    languagesLearned: number;
    achievementsEarned: number;
  };
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4">Your Stats</h3>
      <ul>
        <li className="mb-2">Lessons Completed: {stats.lessonsCompleted}</li>
        <li className="mb-2">Languages Learned: {stats.languagesLearned}</li>
        <li>Achievements Earned: {stats.achievementsEarned}</li>
      </ul>
    </div>
  );
};

export default ProfileStats;