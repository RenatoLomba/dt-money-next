import classNames from 'classnames'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { CaretLeft, CaretRight, MagnifyingGlass, Trash } from 'phosphor-react'
import { FC, FormEvent, useEffect, useState } from 'react'

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
  const [searchText, setSearchText] = useState('')

  const { data, isLoading, isFetching, refetch, isStale } = trpc.useQuery(
    [
      'transactions.get-by-user',
      { page: activePage, description: searchText || null },
    ],
    {
      staleTime: Infinity,
      enabled: false,
    },
  )

  useEffect(() => {
    if (searchText) return

    if (isStale) {
      refetch()
    }
  }, [refetch, activePage, isStale, searchText])

  const {
    mutate: deleteTransaction,
    isLoading: isDeleting,
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

  const cantSearchTransaction = isLoading || isFetching || !searchText.trim()

  const searchTransaction = (e: FormEvent) => {
    e.preventDefault()

    if (cantSearchTransaction) return

    refetch()
  }

  return (
    <TransactionsContainer>
      <SearchForm onSubmit={searchTransaction}>
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Busque por transações"
        />
        <Button type="submit" outlined disabled={cantSearchTransaction}>
          <MagnifyingGlass size={20} />
          <span>Buscar</span>
        </Button>
      </SearchForm>

      {(isLoading || isFetching) && <div>Is loading...</div>}

      {data && data.transactions && (
        <>
          <TransactionsTable>
            <tbody>
              {data.transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="description" width="40%">
                    {transaction.description}
                  </td>
                  <td
                    className={classNames('value', {
                      input: transaction.type === 'INPUT',
                      output: transaction.type === 'OUTPUT',
                    })}
                  >
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(transaction.value)}
                  </td>
                  <td className="category">{transaction.category}</td>
                  <td className="created-date">
                    {format(transaction.createdAt, 'dd/MM/yyyy', {
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    <DeleteTransactionButton
                      disabled={
                        isDeleting &&
                        variables?.transactionId === transaction.id
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
