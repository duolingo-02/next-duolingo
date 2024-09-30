import React from 'react';
import { RouteConfig } from "../types/RouteConfig";
import LayoutWrapper from "../components/layout/LayoutWrapper";
import HeroWelcome from "../pages/welcome";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import Lobby from "../components/games/LobbyLanguage";
import StageListWrapper from "../components/games/StageListWrapper";
import Play from "../components/games/Play";

 const ROUTES: RouteConfig[] = [
  {
    path: "/",
    component: <LayoutWrapper withNavbar={false}><HeroWelcome /></LayoutWrapper>,
    isProtected: false,
    withNavbar: true,
  },
  {
    path: "/login",
    component: <LayoutWrapper withNavbar={false}><Login /></LayoutWrapper>,
    isProtected: false,
    withNavbar: false,
  },
  {
    path: "/register",
    component: <LayoutWrapper withNavbar={false}><SignUp /></LayoutWrapper>,
    isProtected: false,
    withNavbar: false,
  },
  {
    path: "/lobby",
    component: <LayoutWrapper withNavbar={true}><Lobby /></LayoutWrapper>,
    isProtected: true,
    withNavbar: true,
  },
  {
    path: "/language/:languageId/stages",
    component: <LayoutWrapper withNavbar={true} useGameLayout={true}><StageListWrapper /></LayoutWrapper>,
    isProtected: true,
    withNavbar: true,
    useGameLayout: true,
  },
  {
    path: "/language/:languageId/stages/:stageId/play",
    component: <LayoutWrapper withNavbar={true} useGameLayout={true}><Play /></LayoutWrapper>,
    isProtected: true,
    withNavbar: true,
    useGameLayout: true,
  },
];

export { ROUTES };