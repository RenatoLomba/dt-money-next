import styled from 'styled-components'

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem 2.5rem;
`

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  // SMALL SCREEN
  @media screen and (max-width: 768px) {
    display: flex;

    tbody {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 0.75rem;
    }

    tr {
      display: flex;
      flex-direction: column;
      background: ${(props) => props.theme.colors['gray-700']};
      border-radius: 6px;
      padding: 1.25rem;
      position: relative;

      td {
        width: fit-content;

        &.description {
          font-size: ${(props) => props.theme.fontSizes.lg};
        }

        &.value {
          font-size: ${(props) => props.theme.fontSizes['2xl']};
          font-weight: ${(props) => props.theme.fontWeights.bold};
          margin-bottom: 2.5rem;
        }

        &.category {
          color: ${(props) => props.theme.colors['gray-500']};
          font-size: ${(props) => props.theme.fontSizes.lg};
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
        }

        &.created-date {
          color: ${(props) => props.theme.colors['gray-500']};
          font-size: ${(props) => props.theme.fontSizes.lg};
          position: absolute;
          bottom: 1.25rem;
          right: 1.25rem;
        }

        &.input {
          color: ${(props) => props.theme.colors['green-300']};
        }

        &.output {
          color: ${(props) => props.theme.colors['red-300']};
        }

        &.output::before {
          content: '- ';
        }

        &:last-child {
          position: absolute;
          right: 1.25rem;
          top: 1.25rem;
        }
      }
    }
  }

  // LARGE SCREEN
  @media screen and (min-width: 769px) {
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
  }
`

export const SearchForm = styled.form`
  width: 100%;
  display: flex;
  gap: 1rem;

  button {
    padding-right: 2rem;
    padding-left: 2rem;

    @media screen and (max-width: 768px) {
      padding-right: 1rem;
      padding-left: 1rem;

      span {
        display: none;
      }
    }
  }
`

export const DeleteTransactionButton = styled.button`
  line-height: 0;
  border: 1px solid ${(props) => props.theme.colors['red-300']};
  background: transparent;
  color: ${(props) => props.theme.colors['red-300']};
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    border-color: ${(props) => props.theme.colors['gray-100']};
    color: ${(props) => props.theme.colors['gray-100']};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: ${(props) => props.theme.colors['red-300']};
    color: ${(props) => props.theme.colors.white};
  }

  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme.colors['red-300']};
  }
`

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2.5rem;
`

export const PaginationButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 6px;
  background: ${(props) => props.theme.colors['gray-600']};
  color: ${(props) => props.theme.colors['gray-400']};
  border: 0;
  cursor: pointer;
  transition: all 0.2s ease;

  &.active {
    background: ${(props) => props.theme.colors['green-700']};
    color: ${(props) => props.theme.colors['gray-100']};
  }

  &:hover {
    filter: brightness(1.3);
  }
`

export const PaginationStepButton = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  line-height: 0;
  color: ${(props) => props.theme.colors['green-300']};

  &:disabled {
    color: ${(props) => props.theme.colors['gray-600']};
    cursor: not-allowed;
  }
`
