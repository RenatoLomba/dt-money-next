import { MagnifyingGlass } from 'phosphor-react'
import { FC } from 'react'

import { trpc } from '../../utils/trpc'
import { Button } from '../button'
import { Input } from '../input'
import { SearchForm, TransactionsContainer, TransactionsTable } from './styles'

export const Transactions: FC = () => {
  const hello = trpc.useQuery(['hello', { text: 'client' }], {
    staleTime: 1000 * 60,
  })

  console.log(hello?.data)

  return (
    <TransactionsContainer>
      <SearchForm>
        <Input type="text" placeholder="Busque por transações" />
        <Button type="submit" outlined>
          <MagnifyingGlass size={20} />
          <span>Buscar</span>
        </Button>
      </SearchForm>

      <TransactionsTable>
        <tbody>
          <tr>
            <td width="50%">Desenvolvimento de site</td>
            <td className="input">R$ 12.000,00</td>
            <td>Venda</td>
            <td>13/04/2022</td>
          </tr>
          <tr>
            <td width="50%">Aluguel do apartamento</td>
            <td className="output">R$ 1.200,00</td>
            <td>Casa</td>
            <td>15/03/2022</td>
          </tr>
        </tbody>
      </TransactionsTable>
    </TransactionsContainer>
  )
}
