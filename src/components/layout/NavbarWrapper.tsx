'use client'

import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { NavbarWrapperProps } from "../../types/types";
import Navbar from "./Navbar";
import GameLayout from "../../pages/layout";

const NavbarWrapper: React.FC<NavbarWrapperProps> = ({ children, useGameLayout }) => {
  const { isAuthenticated, logoutUser } = useAuth();

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} logout={logoutUser} />
      <div className="pb-24 mt-28 md:pb-12 md:mt-12">
        {useGameLayout ? (
          <GameLayout>{children}</GameLayout>
        ) : (
          children
        )}
      </div>
    </>
  );
};

export default NavbarWrapper;