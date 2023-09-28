import CommonProvider from '@/components/common-provider'
import { AppProps } from 'next/app'
import './globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CommonProvider>
      <Component {...pageProps} />
    </CommonProvider>
  )
}
