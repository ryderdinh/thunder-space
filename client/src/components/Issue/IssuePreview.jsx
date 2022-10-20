import { ClockIcon } from '@heroicons/react/solid'
import ArrowPathIcon from 'components/Icon/ArrowPathIcon'
import Tag from 'components/Tag'
import { LayoutContext } from 'context/LayoutContext'
import { motion } from 'framer-motion'
import { useContext } from 'react'
import variantGlobal from 'units/variantGlobal'

const priorityColor = {
  highest: 'bg-orange-600',
  high: 'bg-amber-600',
  medium: 'bg-green-500',
  low: 'bg-blue-500'
}

const IssuePreview = ({ data, className = '' }) => {
  const { openDialog } = useContext(LayoutContext)

  return (
    <motion.div
      className={`${className} h-max w-full rounded-md bg-[length:100%_auto] 
      bg-no-repeat py-2 px-5 ${
        data.type === 'task'
          ? "bg-[url('assets/images/card-issue-task.png')]  ring-[#10B99F]"
          : "bg-[url('assets/images/card-issue-bug.png')] ring-[#EA6767]"
      }`}
      variants={variantGlobal(3, 0.2)}
      initial='initial'
      animate='enter'
      exit='exit'
    >
      <div className='flex w-full items-center'>
        <div className='flex w-5/6 flex-col gap-2'>
          <h3
            className='text-xl font-bold capitalize text-neutral-50 
                    line-clamp-2'
          >
            {data.name}
          </h3>

          <p className='text-xs italic text-neutral-200'>{data.code}</p>

          <div className='mt-3 flex w-full items-center gap-2'>
            <Tag bg={'bg-neutral-50/40'}>
              <div className='flex items-center gap-1'>
                <ClockIcon className='w-5 text-neutral-50' />

                <p className='text-neutral-50'>
                  {new Date(data.estimate?.end).toLocaleString('vi')}
                </p>
              </div>
            </Tag>

            <Tag bg={priorityColor[data.priority]}>
              <p className='text-neutral-50'>{data.priority}</p>
            </Tag>
          </div>

          <div className='mt-3 flex w-full flex-wrap items-center gap-2'>
            <span className='font-medium text-neutral-200'>
              {!data?.assign ? 'Unassigned' : 'Assignee: '}
            </span>

            {data?.assign && (
              <div className='flex items-center gap-2'>
                <div
                  className='relative h-5 w-5 overflow-hidden rounded-full 
                  ring-2 ring-neutral-50'
                >
                  <img
                    src={data?.assign?.avatar}
                    alt='Avatar user'
                    className='relative z-10 h-full w-full object-cover'
                  />
                </div>
                <p className='text-sm text-neutral-50'>{data?.assign?.name}</p>
                <div
                  onClick={() => {
                    console.log(true)
                    openDialog('assign-issue', { pid: data._id })
                  }}
                >
                  <ArrowPathIcon
                    className='h-5 w-5 cursor-pointer text-neutral-50
                  transition-all duration-200 hover:rotate-180'
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default IssuePreview
