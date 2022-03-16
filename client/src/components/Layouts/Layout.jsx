import LoadingContainer from 'components/Loading/LoadingContainer'
import { Popup } from 'components/Popup'
import Sidebar from 'components/Sidebar/Sidebar'
import { motion } from 'framer-motion'
import { useNavigatorStatus } from 'hooks'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

export default function Layout({ children }) {
  const checkId = useSelector((state) => state._checkLogin._checkLogin)
  // const checkId = 123456
  const isOnline = useNavigatorStatus()
  const history = useHistory()

  useEffect(() => {
    if (checkId) {
      if (!isOnline) {
        toast.error('Không có kết nối mạng')
      }
    }

    if (!checkId) history.push('/login')
  }, [checkId, history, isOnline])

  return (
    <motion.div
      className='container'
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0.5 }}
    >
      {!checkId ? (
        <LoadingContainer />
      ) : (
        <>
          <Sidebar />
          <Toaster position='top-right' reverseOrder={true} />
          {children}
          <Popup />
        </>
      )}
    </motion.div>
  )
}
