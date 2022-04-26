import { toggleActiveSidebar } from 'actions'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NameContainer } from './NameContainer'

export default function HeaderContainer({ pathName }) {
  const [name, setName] = useState('')

  const sidebar = useSelector((state) => state._sidebar)

  const dispatch = useDispatch()

  useEffect(() => {
    const list = {
      home: 'Home',
      timesheets: 'Timesheets',
      report: 'Report',
      workflow: 'Mission Overview',
      work: 'Workflow Overview',
      project: 'Project Overview',
      account: 'Account'
    }

    setName(list[pathName])
  }, [pathName])

  const activeSidebar = () => {
    dispatch(toggleActiveSidebar(!sidebar.active))
  }

  return (
    <div className='view_name'>
      <i className='bx bx-menu' onClick={activeSidebar}></i>
      <NameContainer name={name} />
    </div>
  )
}
