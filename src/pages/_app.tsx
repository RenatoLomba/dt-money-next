import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'

import { withTRPC } from '@trpc/next'

import { GlobalStyle } from '../styles/global'
import { defaultTheme } from '../styles/themes/default'
import { AppRouter } from './api/trpc/[trpc]'

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />

        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return ''
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  if (process.env.RENDER_INTERNAL_HOSTNAME) {
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  }

  return `http://localhost:${process.env.PORT ?? 3000}`
}

export default withTRPC<AppRouter>({
  config() {
    return {
      url: `${getBaseUrl()}/api/trpc`,
    }
  },
  ssr: false,
})(MyApp)
