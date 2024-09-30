'use client'

import React from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from '../../hooks/useAuth';

const Navbar = dynamic(() => import('./Navbar'), { ssr: false });

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, logoutUser } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-duolingoDark text-duolingoLight">
      <Navbar isAuthenticated={isAuthenticated} logout={logoutUser} />
      <main className="flex-grow mt-16 md:mt-0 md:ml-[20%] p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;