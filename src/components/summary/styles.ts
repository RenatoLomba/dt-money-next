import styled from 'styled-components'

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;
  overflow: auto;

  margin-top: -5rem;

  & > div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
`

export const SummaryCardContainer = styled.div<{ filled?: boolean }>`
  min-width: 280px;
  background: ${({ filled, theme }) =>
    filled ? theme.colors['green-700'] : theme.colors['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme.colors['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: ${(props) => props.theme.fontSizes['2xl']};
  }
`
