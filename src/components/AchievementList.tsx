import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AchievementItem from './AchievementItem';
import { Achievement } from '@prisma/client';

interface ExtendedAchievement extends Achievement {
  level: 'bronze' | 'silver' | 'gold' | 'diamond' | 'ruby' | 'special';
}

const AchievementList: React.FC = () => {
  const [achievements, setAchievements] = useState<ExtendedAchievement[]>([]);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achievementsResponse, userPointsResponse] = await Promise.all([
          axios.get('/api/achievements'),
          axios.get('/api/user/totalPoints', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
        ]);

        // Assign levels based on points or any other criteria
        const achievementsWithLevels: ExtendedAchievement[] = achievementsResponse.data.map((achievement: Achievement) => ({
          ...achievement,
          level: assignLevel(achievement.points),
        }));

        setAchievements(achievementsWithLevels);
        setUserPoints(userPointsResponse.data.totalPoints);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load achievements and user points. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const assignLevel = (points: number): 'bronze' | 'silver' | 'gold' | 'diamond' | 'ruby' | 'special' => {
    if (points < 100) return 'bronze';
    if (points < 250) return 'silver';
    if (points < 500) return 'gold';
    if (points < 1000) return 'diamond';
    if (points < 2000) return 'ruby';
    return 'special';
  };

  if (loading) return <div>Loading achievements...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Your Achievements</h1>
        <p className="text-xl text-center text-white mb-8">Total Points: {userPoints}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement) => (
            <AchievementItem
              key={achievement.id}
              id={achievement.id.toString()}
              name={achievement.title}
              isUnlocked={userPoints >= achievement.points}
              level={achievement.level}
              requiredPoints={achievement.points}
              userPoints={userPoints}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementList;