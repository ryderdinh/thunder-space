import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { LayoutContext } from 'context/LayoutContext'
import { useContext, useEffect, useState } from 'react'
import { NameContainer } from './NameContainer'

export default function HeaderContainer({ pathName }) {
  const { sidebar } = useContext(LayoutContext)
  const [name, setName] = useState('')

  useEffect(() => {
    const list = {
      home: 'Home',
      timesheets: 'Timesheets',
      report: 'Report',
      workflow: 'Mission Overview',
      work: 'Workflow Overview',
      project: 'Project Overview',
      issue: 'Issue Overview',
      account: 'Account'
    }

    setName(list[pathName])
  }, [pathName])

  const toggleSidebar = () => {
    sidebar.toggle()
  }

  return (
    <div className='view_name'>
      {sidebar.active ? (
        <ChevronLeftIcon
          className='relative -left-3 h-8 w-8 cursor-pointer'
          onClick={toggleSidebar}
        />
      ) : (
        <ChevronRightIcon
          className='relative -left-3 h-8 w-8 cursor-pointer'
          onClick={toggleSidebar}
        />
      )}
      <NameContainer name={name} />
    </div>
  )
}
