import styled, { css } from 'styled-components'

type ButtonProps = {
  outlined?: boolean
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

export const Button = styled.button<ButtonProps>`
  ${({ outlined = false, size = 'md', fullWidth = false, theme }) => css`
    ${fullWidth && 'width: 100%;'}

    background: ${outlined ? 'transparent' : theme.colors['green-500']};
    border: 1px solid;
    border-color: ${outlined ? theme.colors['green-300'] : 'transparent'};
    border-radius: 6px;
    color: ${outlined ? theme.colors['green-300'] : theme.colors.white};
    padding: ${size === 'sm'
      ? '0.5rem 1rem'
      : size === 'md'
      ? '0.75rem 1.25rem'
      : '1rem 2rem'};
    font-size: ${size === 'sm' ? theme.fontSizes.sm : theme.fontSizes.md};
    font-weight: ${theme.fontWeights.bold};

    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:focus {
      box-shadow: 0 0 0 2px ${theme.colors['green-300']};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: ${(props) => props.theme.colors['gray-500']};
      border-color: #fff;
      color: #fff;
    }

    &:hover:not(:disabled) {
      background: ${outlined
        ? theme.colors['green-500']
        : theme.colors['green-300']};
      color: ${theme.colors.white};
      border-color: ${outlined
        ? theme.colors['green-500']
        : theme.colors['green-300']};
    }
  `}
`
