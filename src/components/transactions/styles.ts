import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme.colors['gray-700']};

    &.input {
      color: ${(props) => props.theme.colors['green-300']};
    }

    &.output {
      color: ${(props) => props.theme.colors['red-300']};
    }

    &.output::before {
      content: '- ';
    }

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
`

export const SearchForm = styled.form`
  width: 100%;
  display: flex;
  gap: 1rem;

  button {
    padding-right: 2rem;
    padding-left: 2rem;
  }
`
