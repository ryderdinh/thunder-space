import Layout from './Layout'
import { addOrModifiedNotificationsData } from 'actions'
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import ViewMain from 'components/Main/ViewMain/ViewMain'
import { env } from 'config/environment'
import { createContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { getCookie } from 'units/cookieWeb'

const socket = io.connect(env.socketUrl, {
  query: {
    token: getCookie().token
  }
})

export const SocketContext = createContext()

const ProtectedLayout = ({ path, children }) => {
  return (
    <SocketContext.Provider value={socket}>
      <MainProtectedLayout path={path} children={children} />
    </SocketContext.Provider>
  )
}

const MainProtectedLayout = ({ path, children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on('invitation-project', (data) => {
      dispatch(addOrModifiedNotificationsData([data]))
    })

    return () => {
      socket.off('invitation-project')
    }
  }, [dispatch])

  return (
    <Layout>
      <Main>
        <HeaderContainer pathName={path} />
        <ViewMain>{children}</ViewMain>
      </Main>
    </Layout>
  )
}

export default ProtectedLayout
