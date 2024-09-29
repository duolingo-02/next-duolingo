import React from 'react';
import Navbar from './Navbar';
import GameLayout from '../../pages/layout';
import { useAuth } from '../../hooks/useAuth';

interface LayoutWrapperProps {
  children: React.ReactNode;
  withNavbar?: boolean;
  useGameLayout?: boolean;
  forAdmin?: boolean;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  withNavbar,
  useGameLayout,
  forAdmin,
}) => {
  const { isAuthenticated, logoutUser } = useAuth();

  let content = children;

  if (forAdmin) {
    content = (
      <div className="flex flex-col min-h-screen bg-gray-100">
        {withNavbar && <Navbar isAuthenticated={isAuthenticated} logout={logoutUser} />}
        <div className="pb-24 mt-28 md:pb-12 md:mt-12">{content}</div>
      </div>
    );
  } else if (useGameLayout) {
    content = <GameLayout>{content}</GameLayout>;
  } else if (withNavbar) {
    content = (
      <>
        <Navbar isAuthenticated={isAuthenticated} logout={logoutUser} />
        <div className="pb-24 mt-28 md:pb-12 md:mt-12">{content}</div>
      </>
    );
  }

  return <>{content}</>;
};

export default LayoutWrapper;