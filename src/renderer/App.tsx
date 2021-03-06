import { getCurrentWebContents } from '@electron/remote'
import React, { type FC, useEffect } from 'react'
import { useKonami } from 'react-konami-code'
import { createGlobalStyle } from 'styled-components'
import { Layout } from './components/Layout'
import { Scrollbar } from './components/Scrollbar'
import { useStore } from './hooks/useStore'
import { fetchWorlds } from './lib/worlds'
import { init } from './state/init'
import { Launch } from './views/Launch'
import { Login } from './views/Login'
import { Settings } from './views/Settings'
import { UserInfo } from './views/UserInfo'

const GlobalStyles = createGlobalStyle`
  body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;

    display: flex;
    justify-content: center;
    align-items: center;

    color: white;
    font-family: 'Open Sans';
  }

  code, pre {
    font-family: 'Fira Mono';
  }

  #app {
    width: 100vw;
    height: 100vh;
  }

  * {
    user-select: none;
  }

  img {
    -webkit-user-drag: none;
  }
`

const toggleDevTools = () => {
  const webContents = getCurrentWebContents()
  webContents.toggleDevTools()
}

export const App: FC = () => {
  const { state, dispatch } = useStore()

  useEffect(() => {
    // Initialise the store
    void init(state, dispatch)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      void fetchWorlds().then(result => {
        if (!(result instanceof Error))
          dispatch({ type: 'setWorlds', value: result })
      })
    }, 30 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [dispatch])

  // Allow opening DevTools on prod
  useKonami(toggleDevTools)

  return (
    <>
      <GlobalStyles />
      <Scrollbar />

      <Layout>
        <Router />
      </Layout>
    </>
  )
}

const Router: FC = () => {
  const { state } = useStore()

  if (state.status !== 'init' && state.showSettings) {
    return <Settings />
  }

  if (state.status !== 'init' && state.showUserInfo) {
    return <UserInfo />
  }

  switch (state.status) {
    case 'init':
      return null

    case 'authenticating':
      return <Login />

    case 'gameLaunching':
    case 'gameRunning':
      return <Launch />

    case 'idle':
      if (!state.user) return <Login />
      return <Launch />

    default:
      throw new Error('Unhandled status!')
  }
}
