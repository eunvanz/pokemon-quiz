import { AppProps } from 'next/app'
import CommonProvider from './components/common-provider/common-provider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CommonProvider>
      <Component {...pageProps} />
    </CommonProvider>
  )
}
