import { Popover } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { LayoutContext } from 'context/LayoutContext'
import { useContext, useEffect, useState } from 'react'
import NotificationOverview from './NotificationOverview'
import { PageName } from './PageName'

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
      'project-setting': 'Project Setting',
      'project-invitation': 'Project Invitation',
      issue: 'Issue Overview',
      'issue-setting': 'Issue Setting',
      account: 'Account',
      notification: 'Notifications'
    }

    setName(list[pathName])
  }, [pathName])

  const toggleSidebar = () => {
    sidebar.toggle()
  }

  return (
    <div className='view_name'>
      <div className='flex'>
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
        <PageName name={name} />
      </div>

      {/* Notification */}
      {pathName !== 'notification' && (
        <Popover className='relative'>
          {({ open }) => (
            <>
              <Popover.Button
                className='cursor-pointer rounded-[4px] border 
              border-neutral-600/50 bg-neutral-600/40 px-2.5 py-1 
              transition-all duration-75 hover:bg-neutral-600/50'
              >
                <BellIcon className='w-4 text-neutral-50/75' />
              </Popover.Button>
              <NotificationOverview />
            </>
          )}
        </Popover>
      )}
    </div>
  )
}
