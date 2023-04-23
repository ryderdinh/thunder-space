import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { ViewfinderCircleIcon } from '@heroicons/react/24/solid'
import { Tooltip } from 'components/Layouts'
import { AnimatePresence, motion } from 'framer-motion'
import useTodo from 'hooks/useTodo'
import moment from 'moment'
import { memo, useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import FlagButton from '../FlagButton'

const TodoCard = ({ colType, data, variant }) => {
  const history = useHistory()

  const [loading, setLoading] = useState({
    flag: false
  })

  const { updateFlag } = useTodo()

  const toggleLoading = useCallback((field) => {
    setLoading((prev) => ({ ...prev, [field]: !prev[field] }))
  }, [])

  const haddleUpdateFlag = useCallback(() => {
    const onProcess = () => {
      toggleLoading('flag')
    }
    const onSuccess = () => {
      toggleLoading('flag')
    }
    const onError = (err) => {
      console.error(err)
      toggleLoading('flag')
    }

    updateFlag(colType, data._id, onProcess, onSuccess, onError)
  }, [colType, data._id, toggleLoading, updateFlag])

  return (
    <AnimatePresence mode='sync'>
      <motion.div
        className={`group-card group/card mt-5 flex 
        rounded-5 border border-gray-500 bg-gray-700 font-bevn
        text-gray-200 hover:border-gray-400`}
        initial='initial'
        animate='enter'
        exit='exit'
        variants={variant}
        layout
      >
        <div
          className='card-drag-handle 
          flex 
          w-[15px] cursor-pointer 
          items-center justify-center rounded-bl rounded-tl bg-gray-500
          text-gray-50 transition duration-300 
          ease-linear group-hover/card:bg-gray-400 group-hover/card:text-white'
        >
          <EllipsisVerticalIcon className='' />
        </div>
        <div className='w-[calc(100%-15px)] p-5'>
          {data?.cover ? (
            <div className='mb-2 h-auto max-h-[300px] w-full'>
              <img src='' alt='' className='w-full object-cover' />
            </div>
          ) : null}

          <div className='flex w-full justify-between'>
            <h5
              className='w-[calc(100%-1.5rem-10px)] text-justify text-base 
              font-normal leading-[20px] text-white line-clamp-3'
            >
              {data.title}
            </h5>
            <Tooltip
              className='left-full top-[calc(100%+10px)] -translate-x-full'
              component={<p className='text-xs'>Click to View</p>}
            >
              <div
                className='w-6 cursor-pointer transition-transform duration-300 
                ease-in-out hover:scale-150'
              >
                <ViewfinderCircleIcon
                  className={`w-6 transition duration-200 hover:text-white`}
                  onClick={() => {
                    history.push(`/todos?todoId=${data._id}`, { ...data })
                  }}
                />
              </div>
            </Tooltip>
          </div>
          <p
            className='mb-[30px] mt-2 text-justify text-sm
            font-light leading-[15px] line-clamp-3'
          >
            {`${data.description}`}
          </p>

          <div
            className='flex w-full items-center justify-between 
            gap-1'
          >
            <FlagButton
              isFlag={data.pin}
              onClick={haddleUpdateFlag}
              loading={loading.flag}
            />
            <span className='font-primary text-xs italic'>
              updated {moment(data.updatedAt).startOf('hour').fromNow()}
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default memo(TodoCard)
