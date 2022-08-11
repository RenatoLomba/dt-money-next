import styled, { css } from 'styled-components'

import * as RadioGroup from '@radix-ui/react-radio-group'

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
