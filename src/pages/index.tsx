import type { NextPage } from 'next'

import { Header } from '../components/header'
import { Summary } from '../components/summary'
import { Transactions } from '../components/transactions'

const Home: NextPage = () => {
  return (
    <div>
      <Header />

      <Summary />

      <Transactions />
    </div>
  )
}

export default Home
