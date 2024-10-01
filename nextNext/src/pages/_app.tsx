import { QueryClient, QueryClientProvider } from 'react-query'
import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '../redux/store/store'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  )
}

export default MyApp