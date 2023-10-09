import CommonProvider from '@/components/common-provider'
import { Analytics } from '@vercel/analytics/react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import './globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,user-scalable=no"
        />
        <meta charSet="utf-8" />
        <meta property="og:url" content="https://pokedrops.io" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Pokédrops" />
        <meta property="og:description" content="Typing game with Pokémon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Pokédrops</title>
      </Head>
      <CommonProvider>
        <Component {...pageProps} />
      </CommonProvider>
      <Analytics />
    </>
  )
}
