import { addOrModifiedNotificationsData } from 'actions'
import HeaderContainer from 'components/Main/HeaderContainer/HeaderContainer'
import Main from 'components/Main/Main'
import ViewMain from 'components/Main/ViewMain/ViewMain'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { getCookie } from 'units/cookieWeb'
import Layout from './Layout'

const socket = io.connect('https://hrmadmin.up.railway.app', {
  query: {
    token: getCookie().token
  }
})

const ProtectedLayout = ({ path, children }) => {
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
