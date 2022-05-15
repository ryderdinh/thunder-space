import { LayoutContext } from 'context/LayoutContext'
import { useContext, useEffect, useState } from 'react'
import { NameContainer } from './NameContainer'

export default function HeaderContainer({ pathName }) {
  const [name, setName] = useState('')

  // const sidebar = useSelector((state) => state._sidebar)
  // const dispatch = useDispatch()

  const { sidebar } = useContext(LayoutContext)

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

  const toggleSidebar = () => {
    sidebar.toggle()
  }

  return (
    <div className='view_name'>
      <i className='bx bx-menu' onClick={toggleSidebar}></i>
      <NameContainer name={name} />
    </div>
  )
}
