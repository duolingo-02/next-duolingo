import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AchievementItem from './AchievementItem';
import { Achievement } from '@prisma/client';

const AchievementList: React.FC = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get('/api/achievements');
        setAchievements(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching achievements:', error);
        setError('Failed to load achievements. Please try again later.');
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return <div>Loading achievements...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {achievements.map((achievement) => (
        <AchievementItem key={achievement.id} achievement={achievement} />
      ))}
    </div>
  );
};

export default AchievementList;