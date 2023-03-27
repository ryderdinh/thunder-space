import { ClockIcon } from '@heroicons/react/24/solid'
import { actUpdateIssue, actUpdateStatusIssue, setDataIssue } from 'actions'
import ArrowPathIcon from 'components/Icon/ArrowPathIcon'
import { LayoutContext } from 'context/LayoutContext'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { motion } from 'framer-motion'
import { useIsMe } from 'hooks'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import variantGlobal from 'units/variantGlobal'
import ActionStatus from './ActionStatus'
import Mask from './Mask'
import Priority from './Priority'
dayjs.extend(duration)

const IssuePreview = ({ dataIssue, dataProject, className = '' }) => {
  const { _data } = useSelector((state) => state._issue)
  const dispatch = useDispatch()

  const { openDialog } = useContext(LayoutContext)

  const [loading, setLoading] = useState({
    estimate: false,
    priority: false,
    status: {
      started: false,
      reject: false,
      done: false,
      close: false,
      pending: false
    }
  })

  const assignToMe = useIsMe(_data?.assign?._id)
  const createByMe = useIsMe(_data?.creator?._id)

  // @ts-check
  /**
   * role : 'botl'|'creator'|'assignee'
   */
  const role = useMemo(
    () => (createByMe ? (assignToMe ? 'both' : 'creator') : 'assignee'),
    [assignToMe, createByMe]
  )

  const handleLoading = (key, value) => {
    setLoading((prev) => ({ ...prev, [key]: value }))
  }

  const onPriorityChange = (priority) => {
    const current = _data.priority
    const onSuccess = () => {
      handleLoading('priority', false)
    }
    const onError = () => {
      handleLoading('priority', false)
      dispatch(setDataIssue({ ..._data, priority: current }))
    }

    if (priority !== _data.priority) {
      handleLoading('priority', true)
      Promise.all([
        dispatch(setDataIssue({ ..._data, priority })),
        dispatch(
          actUpdateIssue(dataIssue?._id, { priority }, onSuccess, onError)
        )
      ])
    }
  }

  const onStatusChange = (value) => {
    const onSuccess = () => {
      dispatch(setDataIssue({ ..._data, status: value }))
      handleLoading('status', { ...loading.status, [value]: false })
    }
    const onError = () => {
      handleLoading('status', { ...loading.status, [value]: false })
    }

    if (value !== _data.status) {
      handleLoading('status', { ...loading.status, [value]: true })
      dispatch(actUpdateStatusIssue(dataIssue?._id, value, onSuccess, onError))
    }
  }

  useEffect(() => {
    let a = dayjs.duration(0, 'd')
    let b = '1d25h30m'.split('')
    let c = {
      d: 0,
      h: 0,
      m: 0
    }
    let index = 0
    let check = true

    for (let e of ['d', 'h', 'm']) {
      if (b.indexOf(e) > 0) {
        let result = b.splice(index, b.indexOf(e) - index).join('')
        if (isNaN(result)) {
          check = false
          break
        }
        c[e] = Number(result)
        index = b.indexOf(e) + 1
      }
    }

    if (!check) return
    else {
      console.log(c)
    }

    Object.keys(c).forEach((e) => {
      a = a.add(c[e], e)
    })
    console.log(a)
  }, [])

  return (
    <motion.div
      className={`${className} rounded-md relative h-max w-full 
      border-2 bg-[#1F1F1F] bg-no-repeat px-5 pt-2 pb-5
      ${dataIssue.type === 'task' ? 'border-[#10B99F]' : 'border-[#EA6767]'}`}
      variants={variantGlobal(3, 0.2)}
      initial='initial'
      animate='enter'
      exit='exit'
    >
      <div className='relative z-[2] flex w-full items-center'>
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
              className='rounded-md flex items-center gap-2 bg-neutral-50/40 
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
                  className='rounded-full relative h-5 w-5 overflow-hidden 
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

          <ActionStatus
            status={_data.status}
            role={role}
            loading={loading.status}
            onChange={onStatusChange}
          />
        </div>
      </div>
      <div className='absolute top-0 left-0 z-[1] h-full w-full overflow-hidden'>
        <Mask
          stroke={dataIssue.type === 'task' ? '#10B99F' : '#EA6767'}
          className='absolute top-1/2 left-1/2 h-full -translate-x-1/2 
          -translate-y-1/2'
        />
      </div>
    </motion.div>
  )
}

export default IssuePreview
