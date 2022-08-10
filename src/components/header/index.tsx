import Image from 'next/image'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog'

import { Button } from '../button'
import { Input } from '../input'
import {
  CloseButton,
  HeaderContainer,
  HeaderContent,
  ModalContent,
  ModalOverlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Image src="/logo.svg" alt="" width={173} height={42} />

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

              <form>
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
      </HeaderContent>
    </HeaderContainer>
  )
}
