import styled, { css } from 'styled-components'

import * as Dialog from '@radix-ui/react-dialog'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const HeaderContainer = styled.header`
  background: ${(props) => props.theme.colors['gray-900']};
  padding: 2.5rem 0 7.5rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ModalOverlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`

export const ModalContent = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme.colors['gray-800']};
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    button[type='submit'] {
      margin-top: 1.5rem;
    }
  }
`

export const CloseButton = styled(Dialog.Close)`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;

  /* line-height: 0; ou font-size: 0; para remover espaçamento inferior dentro do botão */
  line-height: 0;

  cursor: pointer;
  color: ${(props) => props.theme.colors['gray-500']};
`

export const TransactionType = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
`

type TransactionTypeButtonProps = {
  variant?: 'input' | 'output'
}

export const TransactionTypeButton = styled(
  RadioGroup.Item,
)<TransactionTypeButtonProps>`
  ${({ variant = 'input', theme }) => css`
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: ${theme.colors['gray-700']};
    color: ${theme.colors['gray-300']};
    border: 0;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;

    &:focus {
      box-shadow: 0 0 0 2px
        ${variant === 'input'
          ? theme.colors['green-300']
          : theme.colors['red-300']};
    }

    svg {
      color: ${variant === 'input'
        ? theme.colors['green-500']
        : theme.colors['red-500']};
    }

    &[data-state='checked'] {
      color: ${theme.colors.white};
      background: ${variant === 'input'
        ? theme.colors['green-500']
        : theme.colors['red-500']};

      svg {
        color: ${theme.colors.white};
      }
    }

    &[data-state='unchecked']:hover {
      background: ${theme.colors['gray-600']};
    }
  `}
`
