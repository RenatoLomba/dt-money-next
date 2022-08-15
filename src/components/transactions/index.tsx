import classNames from 'classnames'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { MagnifyingGlass, Trash } from 'phosphor-react'
import { FC } from 'react'

import { trpc } from '../../utils/trpc'
import { Button } from '../button'
import { Input } from '../input'
import {
  DeleteTransactionButton,
  SearchForm,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export const Transactions: FC = () => {
  const queryClient = trpc.useContext()

  const { data } = trpc.useQuery(['auth.get-user-transactions'], {
    staleTime: Infinity,
  })

  const {
    mutate: deleteTransaction,
    isLoading,
    variables,
  } = trpc.useMutation(['auth.delete-transaction'], {
    onSuccess: () => {
      queryClient.invalidateQueries('auth.get-user-transactions')
    },
  })

  const handleDeleteTransaction = (transactionId: string) => {
    deleteTransaction({ transactionId })
  }

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
                <td>
                  <DeleteTransactionButton
                    disabled={
                      isLoading && variables?.transactionId === transaction.id
                    }
                    type="button"
                    onClick={() => handleDeleteTransaction(transaction.id)}
                  >
                    <Trash size={20} />
                  </DeleteTransactionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      )}
    </TransactionsContainer>
  )
}
