import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { ArrowCircleDown, ArrowCircleUp, User, X } from 'phosphor-react'
import { FormEvent } from 'react'

import * as Dialog from '@radix-ui/react-dialog'

import { trpc } from '../../utils/trpc'
import { Button } from '../button'
import { Input } from '../input'
import {
  CloseButton,
  HeaderContainer,
  HeaderContent,
  ModalContent,
  ModalOverlay,
  NavBar,
  TransactionType,
  TransactionTypeButton,
} from './styles'

export const Header = () => {
  const { data: session } = useSession()

  const { mutate: createTransaction } = trpc.useMutation('create-transaction')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    createTransaction({
      category: 'Casa',
      description: 'Aluguel',
      type: 'output',
      value: 800.99,
    })
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <Image src="/logo.svg" alt="" width={173} height={42} />

        {!session && (
          <Button size="sm" onClick={() => signIn()}>
            <User />
            <span>Sign In</span>
          </Button>
        )}

        {session && (
          <NavBar>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button size="sm">Nova transação</Button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <ModalOverlay />

                <ModalContent>
                  <Dialog.Title>Nova transação</Dialog.Title>

                  <CloseButton>
                    <X size={24} />
                  </CloseButton>

                  <form onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Descrição" />
                    <Input type="number" placeholder="Preço" />
                    <Input type="text" placeholder="Categoria" />

                    <TransactionType>
                      <TransactionTypeButton value="input" variant="input">
                        <ArrowCircleUp size={32} />
                        <span>Entrada</span>
                      </TransactionTypeButton>
                      <TransactionTypeButton value="output" variant="output">
                        <ArrowCircleDown size={32} />
                        <span>Saída</span>
                      </TransactionTypeButton>
                    </TransactionType>

                    <Button type="submit" size="lg" fullWidth>
                      Cadastrar
                    </Button>
                  </form>
                </ModalContent>
              </Dialog.Portal>
            </Dialog.Root>

            <Button size="sm" onClick={() => signOut()} outlined>
              <User />
              <span>Sign Out</span>
            </Button>
          </NavBar>
        )}
      </HeaderContent>
    </HeaderContainer>
  )
}
