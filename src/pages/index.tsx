import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

import { Header } from '../components/header'
import { Summary } from '../components/summary'
import { Transactions } from '../components/transactions'

const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <div>
      <Header />

      {session && (
        <>
          <Summary />

          <Transactions />
        </>
      )}
    </div>
  )
}

export default Home
