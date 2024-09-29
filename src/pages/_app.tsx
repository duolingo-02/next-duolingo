import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store/store'
import '../styles/globals.css'
import { useRouter } from 'next/router'
import { ROUTES } from '../config/routesConfig'
import LayoutWrapper from '../components/layout/LayoutWrapper'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import { RouteConfig } from '../types/RouteConfig'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const currentRoute = ROUTES.find((route: RouteConfig) => route.path === router.pathname)

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp