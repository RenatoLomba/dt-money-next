import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react'
import { FC, ReactNode, useMemo } from 'react'

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
  const { data } = trpc.useQuery(['auth.get-user-transactions'], {
    staleTime: Infinity,
  })

  const transactionsValues = useMemo(() => {
    if (!data) return null

    return data.transactions.reduce(
      (values, transaction) => {
        if (transaction.type === 'INPUT') {
          values.inputs += transaction.value
        } else {
          values.outputs += transaction.value
        }

        values.total = values.inputs - values.outputs

        return values
      },
      {
        inputs: 0,
        outputs: 0,
        total: 0,
      },
    )
  }, [data])

  return (
    <SummaryContainer>
      <SummaryCard
        title="Entradas"
        icon={<ArrowCircleUp size={32} color="#00b37e" />}
        value={transactionsValues?.inputs ?? 0}
      />

      <SummaryCard
        title="Saídas"
        icon={<ArrowCircleDown size={32} color="#f75a68" />}
        value={transactionsValues?.outputs ?? 0}
      />

      <SummaryCard
        title="Total"
        icon={<CurrencyDollar size={32} />}
        value={transactionsValues?.total ?? 0}
        filled
      />
    </SummaryContainer>
  )
}
