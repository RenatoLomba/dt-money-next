import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'

import { Header } from '../components/header'
import { Summary } from '../components/summary'
import { Transactions } from '../components/transactions'

const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>DtMoney | Ignite</title>
      </Head>
      <div>
        <Header />

        {session && (
          <>
            <Summary />

            <Transactions />
          </>
        )}
      </div>
    </>
  )
}

export default Home
