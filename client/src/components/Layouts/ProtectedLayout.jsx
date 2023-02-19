import { addOrModifiedNotificationsData } from 'actions'
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import ViewMain from 'components/Main/ViewMain/ViewMain'
import { env } from 'config/environment'
import { createContext, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { getCookie } from 'units/cookieWeb'
import useSound from 'use-sound'
import Layout from './Layout'

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
  const [play] = useSound(
    'https://res.cloudinary.com/pu/video/upload/v1676807198/HRMZeliosSea/tbghhkhvsdm0fdtqknsr.mp3'
  )

  useEffect(() => {
    socket.on('invitation-project', (data) => {
      play()
      dispatch(addOrModifiedNotificationsData([data]))
    })

    return () => {
      socket.off('invitation-project')
    }
  }, [dispatch, play])

  return (
    <Layout>
      <Main>
        <HeaderContainer pathName={path} />
        <ViewMain>{children}</ViewMain>

        {/* <button onClick={play}>asdfsdfsdfsdfsdfsdfsdf</button> */}
      </Main>
    </Layout>
  )
}

export default ProtectedLayout
