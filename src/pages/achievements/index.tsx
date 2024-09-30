import React from 'react';
import AchievementList from '../../components/AchievementList';

const AchievementsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Achievements</h1>
      <AchievementList />
    </div>
  );
};

export default AchievementsPage;