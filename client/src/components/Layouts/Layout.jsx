import { setCheckLogin } from 'actions'
import Dialog from 'components/Dialog'
import LoadingContainer from 'components/Loading/LoadingContainer'
import Sidebar from 'components/Sidebar/Sidebar'
import { motion } from 'framer-motion'
import { useNavigatorStatus } from 'hooks'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { getCookie } from 'units/cookieWeb'

export default function Layout({ children }) {
  const { auth } = useSelector((state) => state._checkLogin)
  const dispatch = useDispatch()

  const isOnline = useNavigatorStatus()
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if (!getCookie()?.id || !getCookie()?.token) {
      dispatch(setCheckLogin(false))
    }
  })

  useEffect(() => {
    if (auth && !isOnline) {
      toast.error('Không có kết nối mạng')
    }

    if (!auth) history.push('/login')
  }, [auth, history, isOnline])

  useEffect(() => {
    localStorage.setItem(
      'previousPath',
      location.pathname + location.search + location.hash
    )
  }, [location])

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
          <Toaster position='top-center' reverseOrder={true} />
          {children}
          <Dialog />
        </>
      )}
    </motion.div>
  )
}
