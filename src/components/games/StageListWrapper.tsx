import React from 'react';
import { useRouter } from 'next/router';
import LessonsStages from './LessonsStages';
import Navbar from '../layout/Navbar';
import { useAuth } from '../../hooks/useAuth';

const StageListWrapper: React.FC = () => {
  const router = useRouter();
  const { languageId } = router.query;
  const { isAuthenticated, logoutUser } = useAuth();

  if (!languageId || Array.isArray(languageId)) {
    return <div>Error: Invalid Language ID</div>;
  }

  return (
    <div className="min-h-screen bg-duolingoDark relative overflow-hidden">
      <div className="absolute inset-0 bg-nebula opacity-30"></div>
      <div className="relative z-10">
        <Navbar isAuthenticated={isAuthenticated} logout={logoutUser} />
        <LessonsStages languageId={parseInt(languageId, 10)} />
      </div>
    </div>
  );
};

export default StageListWrapper;