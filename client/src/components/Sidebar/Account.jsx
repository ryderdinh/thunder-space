import { actLogout, setCheckLogin } from 'actions'
import Puff from 'components/Loading/Puff'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height
  }
}

export default function Account(props) {
  //? Create state
  // eslint-disable-next-line no-unused-vars
  const [windowDimensions] = useState(getWindowDimensions())

  //? Connect redux
  const { _data: account } = useSelector((state) => state._staffInfomation)
  const dispatch = useDispatch()

  //? Create function
  const handleSidebarOnMobile = () => {
    if (windowDimensions.width <= 768) {
      props.activeSidebar()
    }
  }

  const signOut = () => {
    const signOutSuccess = () => {
      setTimeout(() => {
        dispatch(setCheckLogin(false))
        window.location.href = `${window.location.origin}/login`
      }, 1000)
    }
    dispatch(actLogout(null, signOutSuccess))
  }

  return (
    <li>
      <div className='profile-details'>
        <Link
          to='/account'
          className='profile-content'
          onClick={handleSidebarOnMobile}
        >
          <div className='avatar-user'>
            {!account.avatar ? (
              <img src={Puff} alt='non avatar user' />
            ) : (
              <img src={account.avatar} alt='avatar user' />
            )}
          </div>
        </Link>
        <Link
          to='/account'
          className='name-job transition-all duration-500 ease-in'
          onClick={() => handleSidebarOnMobile()}
        >
          <div className='profile_name'>{account.name}</div>
          <div className='job'>{account.position}</div>
        </Link>
        <i className='bx bx-log-out' onClick={() => signOut()}></i>
      </div>
    </li>
  )
}
