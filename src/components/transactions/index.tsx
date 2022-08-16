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

export const Transactions: FC = () => {
  const queryClient = trpc.useContext()

  const [activePage, setActivePage] = useState(1)

  const { data } = trpc.useQuery(
    ['transactions.get-by-user', { page: activePage }],
    {
      staleTime: Infinity,
    },
  )

  const {
    mutate: deleteTransaction,
    isLoading,
    variables,
  } = trpc.useMutation(['transactions.delete'], {
    onSuccess: () => {
      queryClient.invalidateQueries('transactions.get-by-user')
      queryClient.invalidateQueries('transactions.get-summary-data')
    },
  })

  const pagesCount = data?.pages ?? 1

  const previousPage = activePage - 1
  const nextPage = activePage + 1

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

      {data && data.transactions && data.pages && (
        <>
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
        </>
      )}
    </TransactionsContainer>
  )
}
