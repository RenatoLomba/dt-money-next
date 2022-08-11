import styled from 'styled-components'

import * as Dialog from '@radix-ui/react-dialog'

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

    .error-message {
      color: ${(props) => props.theme.colors['red-300']};
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

export const NavBar = styled.nav`
  display: flex;
  gap: 1rem;
`
