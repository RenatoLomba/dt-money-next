import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { User, X } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog'

import { Button } from '../button'
import { CreateTransactionForm } from '../create-transaction-form'
import {
  CloseButton,
  HeaderContainer,
  HeaderContent,
  ModalContent,
  ModalOverlay,
  NavBar,
} from './styles'

export const Header = () => {
  const { data: session } = useSession()

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

                  <CreateTransactionForm />
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
