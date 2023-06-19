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
import HeroPattern from './HeroPattern'
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
    socket.on('notification', (data) => {
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
        <div className='view_name absolute left-0 z-[1] w-full bg-deepdark backdrop-blur-xl'></div>
        <HeaderContainer pathName={path} />
        <div className='absolute top-0 z-[1] h-full w-full'>
          <HeroPattern />
        </div>
        <ViewMain>{children}</ViewMain>

        {/* <button onClick={play}>asdfsdfsdfsdfsdfsdfsdf</button> */}
      </Main>
    </Layout>
  )
}

export default ProtectedLayout
