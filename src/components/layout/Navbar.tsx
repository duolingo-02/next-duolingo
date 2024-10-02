'use client'

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import { FaBars, FaTimes } from "react-icons/fa";

interface NavbarProps {
  isAuthenticated: boolean;
  logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  const { isAdmin } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isActive = (path: string) => router.pathname === path || (path === "/" && (router.pathname === "/" || router.pathname === "/home"));

  


  return (
    <div>
      {/* Mobile Logo Bar */}
      <div
        className={`fixed inset-x-0 top-0 z-50 bg-duolingoDark p-4 md:hidden transition-transform duration-300 ease-in-out ${
          isScrollingUp ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-center items-center">
          <Image src="/assets/icons/icon.svg" alt="Icon" width={40} height={40} />
          <h1 className="ml-2 text-3xl font-bold text-duolingoGreen logoTitle">
            LINGOLEAP
          </h1>
        </div>
      </div>

      {/* Desktop Sidebar Toggle */}
      <div className="hidden md:block">
        <div className="fixed z-50 flex items-center top-4 left-4">
          <button
            className="flex items-center p-2 rounded-full text-duolingoLight bg-duolingoDark focus:outline-none focus:ring"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {isOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
          {!isOpen && (
            <div className="flex items-center ml-4">
              <Image src="/assets/icons/icon.svg" alt="Icon" width={40} height={40} className="mr-2" />
              <h1 className="text-3xl font-bold text-duolingoGreen logoTitle">
                LINGOLEAP
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 z-40 flex flex-col h-screen p-6 shadow-xl bg-duolingoDark transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-1/5`}
      >
        <div className="flex justify-center items-center mb-10 mt-14">
          <Image src="/assets/icons/icon.svg" alt="Icon" width={40} height={40} />
          <h1 className="ml-2 text-3xl font-bold text-duolingoGreen logoTitle">
            LINGOLEAP
          </h1>
        </div>
        <ul className="flex flex-col space-y-8">
          <li className="flex items-center gap-4 group">
            <span className="p-3 transition-transform duration-300 rounded-full shadow-lg bg-duolingoGreen group-hover:scale-110">
              <Image src="/assets/icons/learn.svg" alt="Learn" width={24} height={24} className="text-duolingoLight" />
            </span>
            <Link
              href="/"
              className={`text-xl font-medium ${
                isActive("/")
                  ? "text-duolingoGreen"
                  : "text-duolingoLight group-hover:text-duolingoGreen"
              } transition-colors duration-300`}
            >
              Learn
            </Link>
          </li>
          <li className="flex items-center gap-4 group">
            <span className="p-3 transition-transform duration-300 rounded-full shadow-lg bg-duolingoGreen group-hover:scale-110">
              <Image src="/assets/icons/achivement.svg" alt="Achievements" width={24} height={24} className="text-duolingoLight" />
            </span>
            <Link
              href="/achievements"
              className={`text-xl font-medium ${
                isActive("/achievements")
                  ? "text-duolingoGreen"
                  : "text-duolingoLight group-hover:text-duolingoGreen"
              } transition-colors duration-300`}
            >
              Achievements
            </Link>
          </li>
          <li className="flex items-center gap-4 group">
            <span className="p-3 transition-transform duration-300 rounded-full shadow-lg bg-duolingoGreen group-hover:scale-110">
              <Image src="/assets/icons/profile.svg" alt="Profile" width={24} height={24} className="text-duolingoLight" />
            </span>
            <Link
              href="/profile"
              className={`text-xl font-medium ${
                isActive("/profile")
                  ? "text-duolingoGreen"
                  : "text-duolingoLight group-hover:text-duolingoGreen"
              } transition-colors duration-300`}
            >
              Profile
            </Link>
          </li>
          {isAdmin && (
            <li className="flex items-center gap-4 group">
              <span className="p-3 transition-transform duration-300 rounded-full shadow-lg bg-duolingoGreen group-hover:scale-110">
                <Image src="/assets/icons/admin.svg" alt="Admin" width={24} height={24} className="text-duolingoLight" />
              </span>
              <Link
                href="/admin-dashboard"
                className={`text-xl font-medium ${
                  isActive("/admin-dashboard")
                    ? "text-duolingoGreen"
                    : "text-duolingoLight group-hover:text-duolingoGreen"
                } transition-colors duration-300`}
              >
                Admin Panel
              </Link>
            </li>
          )}
        </ul>

        {/* Logout Button */}
        <div className="mt-auto">
        {isAuthenticated && (
      <Link
        href="/login"
        className="inline-block w-30 px-6 py-3 text-xl font-bold text-center transition-transform duration-300 bg-red-500 rounded-full shadow-lg text-duolingoLight hover:bg-red-600 hover:scale-105"      >
          Logout
      </Link>
          )}
        </div>
      </div>

      {/* Overlay to Close Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <div className="fixed inset-x-0 bottom-0 z-50 block bg-duolingoGreen md:hidden">
        <div className="flex justify-around p-4">
          <Link
            href="/"
            className="flex flex-col items-center transition-all duration-300 ease-in-out"
          >
            <Image src="/assets/icons/learn.svg" alt="Learn" width={24} height={24} className="mb-1 text-duolingoLight" />
            <span
              className={`text-xs transition-all duration-300 ease-in-out ${
                isActive("/")
                  ? "bg-duolingoLight text-duolingoDark rounded-full px-2 shadow-lg"
                  : "text-duolingoLight hover:bg-duolingoLight hover:text-duolingoDark hover:rounded-full hover:shadow-md"
              }`}
            >
              Learn
            </span>
          </Link>
          <Link
            href="/achievements"
            className="flex flex-col items-center transition-all duration-300 ease-in-out"
          >
            <Image src="/assets/icons/achivement.svg" alt="Achievements" width={24} height={24} className="mb-1 text-duolingoLight" />
            <span
              className={`text-xs transition-all duration-300 ease-in-out ${
                isActive("/achievements")
                  ? "bg-duolingoLight text-duolingoDark rounded-full px-2 shadow-lg"
                  : "text-duolingoLight hover:bg-duolingoLight hover:text-duolingoDark hover:rounded-full hover:shadow-md"
              }`}
            >
              Achievements
            </span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center transition-all duration-300 ease-in-out"
          >
            <Image src="/assets/icons/profile.svg" alt="Profile" width={24} height={24} className="mb-1 text-duolingoLight" />
            <span
              className={`text-xs transition-all duration-300 ease-in-out ${
                isActive("/profile")
                  ? "bg-duolingoLight text-duolingoDark rounded-full px-2 shadow-lg"
                  : "text-duolingoLight hover:bg-duolingoLight hover:text-duolingoDark hover:rounded-full hover:shadow-md"
              }`}
            >
              Profile
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;