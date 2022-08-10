import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors['green-500']};
  }

  ::selection {
    background: ${(props) => props.theme.colors['green-300']};
    color: ${(props) => props.theme.colors.white};
  }

  body {
    background: ${(props) => props.theme.colors['gray-800']};
    color: ${(props) => props.theme.colors['gray-100']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: ${({ theme }) =>
      `${theme.fontWeights.regular} ${theme.fontSizes.md} ${theme.fontFamilies.roboto}`};
    line-height: 1.6;
  }
`
