import classNames from 'classnames'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { CaretLeft, CaretRight, MagnifyingGlass, Trash } from 'phosphor-react'
import { FC, useState } from 'react'

import { trpc } from '../../utils/trpc'
import { Button } from '../button'
import { Input } from '../input'
import {
  DeleteTransactionButton,
  PaginationButton,
  PaginationContainer,
  PaginationStepButton,
  SearchForm,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

const transactionsPerPage = 5

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

  const [activePage, setActivePage] = useState(1)
  const pagesCount = Math.ceil(
    (data?.transactions.length ?? 0) / transactionsPerPage,
  )

  const previousPage = activePage - 1
  const nextPage = activePage + 1

  const transactions =
    data?.transactions.slice(
      transactionsPerPage * (activePage - 1),
      transactionsPerPage * activePage,
    ) ?? []

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

      {transactions.length > 0 && (
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
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

      <PaginationContainer>
        <PaginationStepButton
          disabled={previousPage === 0}
          type="button"
          onClick={() => setActivePage(previousPage)}
        >
          <CaretLeft size={24} />
        </PaginationStepButton>

        {Array.from(Array(pagesCount).keys()).map((page) => (
          <PaginationButton
            key={page}
            className={classNames({
              active: page + 1 === activePage,
            })}
            type="button"
            onClick={() => setActivePage(page + 1)}
          >
            {page + 1}
          </PaginationButton>
        ))}

        <PaginationStepButton
          disabled={nextPage > pagesCount}
          type="button"
          onClick={() => setActivePage(nextPage)}
        >
          <CaretRight size={24} />
        </PaginationStepButton>
      </PaginationContainer>
    </TransactionsContainer>
  )
}
