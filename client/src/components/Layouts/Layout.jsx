import { setCheckLogin } from 'actions'
import LoadingContainer from 'components/Loading/LoadingContainer'
import Sidebar from 'components/Sidebar/Sidebar'
import { motion } from 'framer-motion'
import { useNavigatorStatus } from 'hooks'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'

export default function Layout({ children }) {
  const { auth } = useSelector((state) => state._checkLogin)
  const dispatch = useDispatch()

  const isOnline = useNavigatorStatus()
  const history = useHistory()
  const location = useLocation()

  // useEffect(() => {
  //   if (!getCookie()?.id || !getCookie()?.token) {
  //     dispatch(setCheckLogin(false))
  //   }
  // })

  useEffect(() => {
    if (auth && !isOnline) {
      toast.error('You are offline')
    }

    if (!auth) history.push('/login')
  }, [auth, history, isOnline])

  useEffect(() => {
    localStorage.setItem(
      'previousPath',
      location.pathname + location.search + location.hash
    )
  }, [location])

  useEffect(() => {
    const checkUserLogin = () => {
      if (window.localStorage.getItem('thunder-space-login') !== 'true') {
        dispatch(setCheckLogin(false))
      } else {
        dispatch(setCheckLogin(true))
      }
    }

    window.addEventListener('storage', checkUserLogin)

    return () => {
      window.removeEventListener('storage', checkUserLogin)
    }
  }, [dispatch])

  return (
    <motion.div
      className='container-app'
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5 }}
    >
      {!auth ? (
        <LoadingContainer />
      ) : (
        <>
          <Sidebar />
          {children}
        </>
      )}
    </motion.div>
  )
}
