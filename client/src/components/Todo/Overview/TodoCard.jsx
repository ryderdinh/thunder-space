import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { ViewfinderCircleIcon } from '@heroicons/react/24/solid'
import { Tooltip } from 'components/Layouts'
import { motion } from 'framer-motion'
import FlagButton from '../FlagButton'

const TodoCard = ({ data, variant }) => {
  return (
    <motion.div
      className={`mt-5 flex 
      rounded-5 border border-gray-500 bg-gray-700 font-bevn
      text-gray-200`}
      initial='initial'
      animate='enter'
      exit='exit'
      variants={variant}
    >
      <div
        className='card-drag-handle flex w-[15px] cursor-pointer 
        items-center justify-center bg-gray-500'
      >
        <EllipsisVerticalIcon className='text-gray-50' />
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
          <div className='w-6 cursor-pointer'>
            <Tooltip component={<p className='text-xs'>View</p>}>
              <ViewfinderCircleIcon
                className={`w-6 transition duration-200 hover:text-white`}
              />
            </Tooltip>
          </div>
        </div>
        <div
          className='mt-2 mb-[30px] text-justify text-sm
          font-light leading-[15px] line-clamp-3'
        >
          {data.description}
        </div>
        <div
          className='flex w-full items-center justify-between 
          gap-1'
        >
          <FlagButton isFlag={data.pin} onClick={() => {}} />
          <span className='font-primary text-xs italic'>
            updated 22 min ago
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default TodoCard
