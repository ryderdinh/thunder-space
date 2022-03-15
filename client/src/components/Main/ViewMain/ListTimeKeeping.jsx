import LottieLoader from 'components/Loading/LottieLoader'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

export default function ListTimeKeeping({ variants }) {
	const timeOfAttendance = useSelector(state => state._timeOfAttendance._list)
	const isLoading = useSelector(state => state._timeOfAttendance._isLoading)

	return (
		<motion.div
			className='view_item panel list-time-keeping'
			variants={variants}
			initial='hidden'
			animate='visible'
			exit='exit'
		>
			<div className='label'>
				{isLoading && <LottieLoader type={'sound'} />}
				<p> Lịch sử chấm công</p>
			</div>
			{isLoading ? (
				''
			) : (
				<div className='list-time-keeping_box'>
					{!timeOfAttendance.length
						? 'Không có dữ liệu'
						: timeOfAttendance.map((value, index) => (
								<ListTimeKeepingItem
									key={index}
									time={value[0]}
									rangeMetter={value[1]}
								/>
						  ))}
				</div>
			)}
		</motion.div>
	)
}

function ListTimeKeepingItem({ time, rangeMetter }) {
	const convertTime = time => {
		const date = new Date(time)
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit'
		})
	}

	return (
		<div className='list-time-keeping_item'>
			<div className='icon_timeline'>
				<img src={require('assets/images/icons/gps.svg').default} alt='Gps' />
				<div className='rect'></div>
			</div>
			<div className='detail'>
				<div className='time'>
					<p>{convertTime(time)}</p>
				</div>
				<div className='range'>
					<p>{`Cách công ty ${rangeMetter}m`}</p>
				</div>
			</div>
		</div>
	)
}
