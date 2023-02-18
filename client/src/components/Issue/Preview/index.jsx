import Priority from './Priority'
import { ClockIcon } from '@heroicons/react/solid'
import { actUpdateIssue, setDataIssue } from 'actions'
import ButtonNormal from 'components/Button/ButtonNormal'
import ArrowPathIcon from 'components/Icon/ArrowPathIcon'
import { LayoutContext } from 'context/LayoutContext'
import { motion } from 'framer-motion'
import { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import variantGlobal from 'units/variantGlobal'

const IssuePreview = ({ dataIssue, dataProject, className = '' }) => {
  const { _data } = useSelector((state) => state._issue)
  const dispatch = useDispatch()

  const { openDialog } = useContext(LayoutContext)

  const [loading, setLoading] = useState({
    priority: false
  })

  const handleLoading = (key, value) => {
    setLoading((prev) => ({ ...prev, [key]: value }))
  }

  const onPriorityChange = (priority) => {
    handleLoading('priority', true)

    const onSuccess = () => {
      dispatch(setDataIssue({ ..._data, priority }))
      handleLoading('priority', false)
    }
    const onError = () => {
      handleLoading('priority', false)
    }

    dispatch(actUpdateIssue(dataIssue?._id, { priority }, onSuccess, onError))
  }

  return (
    <motion.div
      className={`${className} h-max w-full rounded-md bg-[length:100%_auto] 
      bg-no-repeat pt-2 px-5 pb-5 ${
        dataIssue.type === 'task'
          ? "bg-[url('assets/images/card-issue-task.png')]  ring-[#10B99F]"
          : "bg-[url('assets/images/card-issue-bug.png')] ring-[#EA6767]"
      }`}
      variants={variantGlobal(3, 0.2)}
      initial='initial'
      animate='enter'
      exit='exit'
    >
      <div className='flex w-full items-center'>
        <div className='flex w-full flex-col gap-2'>
          <h3
            className='text-xl font-bold capitalize text-neutral-50 
            line-clamp-2'
          >
            {dataIssue.name}
          </h3>

          <p className='text-xs italic text-neutral-200'>{dataIssue.code}</p>

          <div className='mt-3 flex w-full items-center gap-2'>
            <div
              className='flex items-center gap-2 rounded-md bg-neutral-50/40 
              px-2 py-1'
            >
              <div className='flex items-center gap-1'>
                <ClockIcon className='w-4 text-neutral-50' />

                <p className='text-sm text-neutral-50'>
                  {new Date(dataIssue.estimate?.end).toLocaleString('vi')}
                </p>
              </div>
            </div>

            <Priority
              priority={dataIssue?.priority}
              loading={loading.priority}
              onChange={onPriorityChange}
            />
          </div>

          <div className='mt-3 flex w-full flex-wrap items-center gap-2'>
            <span className='font-medium text-neutral-200'>
              {!dataIssue?.assign ? 'Unassigned' : 'Assignee: '}
            </span>

            {dataIssue?.assign && (
              <div
                className='group flex cursor-pointer items-center gap-2'
                onClick={() => {
                  openDialog('assign-issue', {
                    iid: dataIssue._id,
                    members: dataProject.member.map((mem) => {
                      delete mem.role
                      return mem
                    }),
                    currentAssignee: dataIssue?.assign || {}
                  })
                }}
              >
                <div
                  className='relative h-5 w-5 overflow-hidden rounded-full 
                  ring-2 ring-neutral-50'
                >
                  <img
                    src={dataIssue?.assign?.avatar}
                    alt='Avatar user'
                    className='relative z-[2] h-full w-full object-cover'
                  />
                </div>

                <p className='text-sm text-neutral-50'>
                  {dataIssue?.assign?.name}
                </p>

                <ArrowPathIcon
                  className='h-5 w-5 text-neutral-50 transition-all 
                  duration-200 group-hover:rotate-180'
                />
              </div>
            )}
          </div>

          <div className='w-full mt-3'>
            <ButtonNormal className='py-1 text-center font-semibold text-base'>
              Start
            </ButtonNormal>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default IssuePreview
