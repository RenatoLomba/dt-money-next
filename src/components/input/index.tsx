import styled, { css } from 'styled-components'

export const Input = styled.input<{ error?: boolean }>`
  ${({ theme, error }) => css`
    width: 100%;
    background: ${theme.colors['gray-900']};
    border: 1px solid transparent;
    padding: 1rem;
    font-size: ${theme.fontSizes.md};
    border-radius: 6px;
    color: ${theme.colors['gray-300']};

    &::placeholder {
      color: ${theme.colors['gray-500']};
    }

    ${error &&
    css`
      box-shadow: 0 0 0 2px ${theme.colors['red-300']};
    `}
  `}
`
