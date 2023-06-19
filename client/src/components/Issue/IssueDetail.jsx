import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/24/solid'
import { Tooltip } from 'components/Layouts'
import { UserInfo } from 'components/More'
import { motion } from 'framer-motion'
import variantGlobal from 'units/variantGlobal'

const priorityColor = {
  highest: 'text-orange-600',
  high: 'text-amber-600',
  medium: 'text-green-500',
  low: 'text-blue-500'
}

const IssueDetail = ({ data }) => {
  return (
    <motion.div
      className='w-full'
      variants={variantGlobal(3, 0.5)}
      initial='initial'
      animate='enter'
      exit='exit'
    >
      <div
        className='mx-0 w-full rounded-md border border-[#282828] bg-[#1f1f1f] 
        p-2 md:mx-auto md:max-w-md'
      >
        <Disclosure as='div' defaultOpen={true}>
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`
                ${open ? 'bg-[#282828]' : 'bg-[#1f1f1f]'}
                flex w-full justify-between rounded-md border-0 
                px-4 py-2 text-left text-sm font-medium text-neutral-300 
                ring-transparent transition-all duration-300 ease-in-out 
                hover:bg-[#282828] focus:outline-none focus-visible:ring 
                focus-visible:ring-[#282828] focus-visible:ring-opacity-75`}
              >
                <span>Detail infomation</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-neutral-300`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className='space-y-2 px-4 pb-2 pt-4 text-sm'>
                <div className='grid grid-cols-2 text-neutral-500'>
                  <div className=''>
                    <p>Type</p>
                  </div>
                  <div className='font-bold'>
                    <p
                      className={`${
                        data.type === 'task'
                          ? 'text-emerald-600'
                          : 'text-red-600'
                      }`}
                    >
                      {data.type}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-2 text-neutral-500'>
                  <div className=''>
                    <p>Priority</p>
                  </div>
                  <div className='font-bold'>
                    <p className={priorityColor[data.priority]}>
                      {data.priority}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-2 text-neutral-500'>
                  <div className=''>
                    <p>Status</p>
                  </div>
                  <div className='font-bold'>
                    <p>{data.status}</p>
                  </div>
                </div>

                <div className='grid grid-cols-2 text-neutral-500'>
                  <div className=''>
                    <p>Creator</p>
                  </div>
                  <div className='w-max font-bold'>
                    <Tooltip
                      className=''
                      component={
                        <UserInfo
                          name={data?.creator?.name}
                          avatar={data?.creator?.avatar?.url}
                          email={data?.creator?.email}
                        />
                      }
                    >
                      <span className='truncate'>{data.creator?.name}</span>
                    </Tooltip>
                  </div>
                </div>

                <div className='grid grid-cols-2 text-neutral-500'>
                  <div className=''>
                    <p>Assignee</p>
                  </div>
                  <div className='w-max font-bold'>
                    <Tooltip
                      className=''
                      component={
                        <UserInfo
                          name={data?.assign?.name}
                          avatar={data?.assign?.avatar?.url}
                          email={data?.assign?.email}
                        />
                      }
                      disable={data?.assign ? false : true}
                    >
                      <span className='truncate'>
                        {data?.assign ? data?.assign?.name : 'Unassigned'}
                      </span>
                    </Tooltip>
                  </div>
                </div>

                <div className='grid grid-cols-2 text-neutral-500'>
                  <div className=''>
                    <p>Created at</p>
                  </div>
                  <div className='font-bold'>
                    <p>{new Date(data.createdAt).toLocaleString('vi')}</p>
                  </div>
                </div>

                <div className='grid grid-cols-2 text-neutral-500'>
                  <div className=''>
                    <p>Start time</p>
                  </div>
                  <div className='font-bold'>
                    <p>
                      {data?.estimate?.start
                        ? new Date(data?.estimate?.start).toLocaleString('vi')
                        : 'None'}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-2 text-neutral-500'>
                  <div className=''>
                    <p>Estimate</p>
                  </div>
                  <div className='font-bold'>
                    <p>{new Date(data.estimate?.end).toLocaleString('vi')}</p>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </motion.div>
  )
}

export default IssueDetail
