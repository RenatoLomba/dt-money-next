import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { FC, ReactNode } from 'react'

import { trpc } from '../../utils/trpc'
import { SummaryCardContainer, SummaryContainer } from './styles'

type SummaryCardProps = {
  title: string
  icon: ReactNode
  value: number
  filled?: boolean
}

const SummaryCard: FC<SummaryCardProps> = ({ title, icon, value, filled }) => {
  return (
    <SummaryCardContainer filled={filled}>
      <header>
        <span>{title}</span>

        {icon}
      </header>

      <strong>
        {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value)}
      </strong>
    </SummaryCardContainer>
  )
}

export const Summary: FC = () => {
  const { data } = trpc.useQuery(['transactions.get-summary-data'], {
    staleTime: Infinity,
  })

  return (
    <SummaryContainer>
      <SummaryCard
        title="Entradas"
        icon={<ArrowCircleUp size={32} color="#00b37e" />}
        value={data?.inputs ?? 0}
      />

      <SummaryCard
        title="Saídas"
        icon={<ArrowCircleDown size={32} color="#f75a68" />}
        value={data?.outputs ?? 0}
      />

      <SummaryCard
        title="Total"
        icon={<CurrencyDollar size={32} />}
        value={(data?.inputs ?? 0) - (data?.outputs ?? 0)}
        filled
      />
    </SummaryContainer>
  )
}
