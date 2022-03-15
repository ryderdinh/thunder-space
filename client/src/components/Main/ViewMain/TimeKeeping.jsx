import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import BtnTimeKeeping from '../../Button/BtnTimeKeeping'

export default function TimeKeeping({ variants }) {
	const count = useSelector(state => state._timeOfAttendance._count)
	const status = useSelector(state => state._timeOfAttendance._status)

	return (
		<motion.div
			className='view_item panel time-keeping'
			variants={variants}
			initial='hidden'
			animate='visible'
			exit='exit'
		>
			<div className='time-keeping_hour'>
				<div className='hour'>
					<p className='hour-realtime'>{count}</p>h
				</div>
			</div>
			<div className='time-keeping_label'>
				<p className='status-realtime'>
					{status === false
						? 'Chưa chấm công'
						: count < 8.5
						? 'Chưa đủ công'
						: 'Đã đủ công'}
				</p>
				<p className='status-hour'></p>
			</div>
			<BtnTimeKeeping
				className={'btn time-keeping_btn'}
				content={'Chấm công'}
			/>
		</motion.div>
	)
}
