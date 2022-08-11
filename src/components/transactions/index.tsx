import classNames from 'classnames'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { MagnifyingGlass } from 'phosphor-react'
import { FC } from 'react'

import { trpc } from '../../utils/trpc'
import { Button } from '../button'
import { Input } from '../input'
import { SearchForm, TransactionsContainer, TransactionsTable } from './styles'

export const Transactions: FC = () => {
  const { data } = trpc.useQuery(['auth.get-user-transactions'], {
    staleTime: Infinity,
  })

  console.log(data?.transactions)

  return (
    <TransactionsContainer>
      <SearchForm>
        <Input type="text" placeholder="Busque por transações" />
        <Button type="submit" outlined>
          <MagnifyingGlass size={20} />
          <span>Buscar</span>
        </Button>
      </SearchForm>

      {data?.transactions && (
        <TransactionsTable>
          <tbody>
            {data.transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td width="40%">{transaction.description}</td>
                <td
                  className={classNames({
                    input: transaction.type === 'INPUT',
                    output: transaction.type === 'OUTPUT',
                  })}
                >
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(transaction.value)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {format(transaction.createdAt, 'dd/MM/yyyy', {
                    locale: ptBR,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      )}
    </TransactionsContainer>
  )
}
