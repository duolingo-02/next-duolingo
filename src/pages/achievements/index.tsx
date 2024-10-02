import React from 'react';
import AchievementList from '../../components/AchievementList';
import Navbar from '../../components/layout/Navbar';
const AchievementsPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar isAuthenticated={true} logout={() => {}} />
      <h1 className="text-3xl font-bold mb-8"></h1>
      <AchievementList />
    </div>
  );
};

export default AchievementsPage;