import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store/store'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { ROUTES } from '../config/routesConfig'
import { RouteConfig } from '../types/RouteConfig'
import React from 'react'
import GameBar from '../components/games/GameBar'
import Navbar from '../components/layout/Navbar'
import { useAuth } from '../hooks/useAuth'

const queryClient = new QueryClient()

const GameWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <GameBar initialTimerValue={10} />
    <div>{children}</div>
  </>
)

const AdminWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-gray-100">{children}</div>
)
const NavbarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, logoutUser } = useAuth()
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} logout={logoutUser} />
      <div className="pb-24 md:pb-12">{children}</div>
    </>
  )
}

const LayoutWrapper: React.FC<{
  children: React.ReactNode
  withNavbar?: boolean
  useGameLayout?: boolean
  forAdmin?: boolean
}> = ({ children, withNavbar, useGameLayout, forAdmin }) => {
  let content = children

  if (forAdmin) {
    content = (
      <NavbarWrapper>
        <AdminWrapper>{content}</AdminWrapper>
      </NavbarWrapper>
    )
  }

  if (withNavbar) {
    content = <NavbarWrapper>{content}</NavbarWrapper>
  }

  if (useGameLayout) {
    content = <GameWrapper>{content}</GameWrapper>
  }

  return <>{content}</>
}

const ProtectedRoute: React.FC<{
  children: React.ReactNode
  isProtected?: boolean
  forAdmin?: boolean
}> = ({ children, isProtected, forAdmin }) => {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (isProtected && !isAuthenticated) {
      router.replace('/login')
    }
    if (forAdmin && !isAdmin) {
      router.replace('/login')
    }
  }, [isProtected, forAdmin, isAuthenticated, isAdmin, router])

  return <>{children}</>
}
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const currentRoute = ROUTES.find((route: RouteConfig) => route.path === router.pathname)

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div className="app-container">
          <ProtectedRoute
            isProtected={currentRoute?.isProtected}
            forAdmin={currentRoute?.forAdmin}
          >
            <LayoutWrapper
              withNavbar={currentRoute?.withNavbar}
              useGameLayout={currentRoute?.useGameLayout}
              forAdmin={currentRoute?.forAdmin}
            >
              <Component {...pageProps} />
            </LayoutWrapper>
          </ProtectedRoute>
        </div>
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp