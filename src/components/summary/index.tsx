import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { FC, ReactNode } from 'react'

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
  return (
    <SummaryContainer>
      <SummaryCard
        title="Entradas"
        icon={<ArrowCircleUp size={32} color="#00b37e" />}
        value={17400}
      />

      <SummaryCard
        title="Saídas"
        icon={<ArrowCircleDown size={32} color="#f75a68" />}
        value={1259}
      />

      <SummaryCard
        title="Total"
        icon={<CurrencyDollar size={32} />}
        value={1259}
        filled
      />
    </SummaryContainer>
  )
}
