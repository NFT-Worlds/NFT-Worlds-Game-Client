import { dialog, getCurrentWindow } from '@electron/remote'
import { type update as Update } from 'msmc'
import React, {
  type FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import styled from 'styled-components'
import { LoadBar } from '../components/LoadBar'
import { LoginMicrosoftButton } from '../components/LoginMicrosoftButton'
import { useStore } from '../hooks/useStore'
import { login, loginEvents } from '../ipc/auth'

const Container = styled.div`
  width: 100%;
  height: calc(100% - 25px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`

const Status = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  margin: 8px 0;
`

const LoginButton = styled.div`
  width: 340px;
`

export const Login: FC = () => {
  const { state, dispatch } = useStore()
  const disabled = useMemo<boolean>(
    () => state.status === 'authenticating',
    [state]
  )

  const [progress, setProgress] = useState<number | undefined>()
  const [status, setStatus] = useState<string | undefined>()

  const onUpdate = useCallback((update: Update) => {
    if (update.percent) setProgress(update.percent)
    if (update.data) setStatus(update.data)
  }, [])

  useEffect(() => {
    loginEvents.addListener('update', onUpdate)

    return () => {
      loginEvents.removeListener('update', onUpdate)
    }
  }, [onUpdate])

  const handleLogin = useCallback(() => {
    dispatch({ type: 'setStatus', value: 'authenticating' })

    void login()
      .then(({ profile, wallets }) => {
        dispatch({ type: 'setUser', value: profile })
        dispatch({ type: 'setWallets', value: wallets })
      })
      .catch((error: Error) => {
        const win = getCurrentWindow()
        void dialog.showMessageBox(win, {
          title: win.title,
          type: 'error',
          message: 'Login Failed',
          detail:
            'Make sure your Microsoft account owns a copy of Minecraft: Java Edition.',
        })

        console.error(error)
      })
      .finally(() => {
        setProgress(undefined)
        setStatus(undefined)

        dispatch({ type: 'setStatus', value: 'idle' })
      })
  }, [dispatch])

  return (
    <Container>
      <Status>{status}</Status>

      <LoginButton>
        <LoginMicrosoftButton disabled={disabled} onClick={handleLogin} />
      </LoginButton>

      {progress && (
        <LoadBar colour='rgba(255, 255, 255, 0.5)' percent={progress} />
      )}
    </Container>
  )
}
