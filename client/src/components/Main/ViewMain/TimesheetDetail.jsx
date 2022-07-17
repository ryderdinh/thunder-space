import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const changeTimeToFloat = (value1, value2) => {
	const convertValue = value =>
		Number(value.slice(0, 2)) +
		Number(value.slice(3, 5)) / 60 +
		Number(value.slice(6, 8)) / 3600;

	value1 = convertValue(value1);
	value2 = convertValue(value2);

	return (value2 - value1).toFixed(1);
};

export default function TimesheetDetail({ variants }) {
	const timesheetDetailItem = useSelector(
		state => state._timesheets._detailItem[0]
	);

	let handleData = data => {
		let hour = changeTimeToFloat(data[2], data[3]),
			nwork;
		if (hour >= 8) {
			nwork = 1;
		} else if (hour < 8 && hour >= 4) {
			nwork = 0.5;
		} else {
			nwork = 0;
		}
		switch (data[0]) {
			case 0:
				return (
					<>
						<div className='timesheet-detail--item'>Ngày: {data[1]}</div>
						<div className='timesheet-detail--item'>Giờ vào: {data[2]}</div>
						<div className='timesheet-detail--item'>Giờ ra: {data[3]}</div>
						<div className='timesheet-detail--item'>Tổng giờ: {hour}</div>
						<div className='timesheet-detail--item'>Công: {nwork}</div>
					</>
				);
			case 1:
				return (
					<>
						<div className='timesheet-detail--item'>Ngày: {data[1]}</div>
						<div className='timesheet-detail--item'>
							Trạng thái: Nghỉ có phép
						</div>
					</>
				);
			case 2:
				return (
					<>
						<div className='timesheet-detail--item'>Ngày: {data[1]}</div>
						<div className='timesheet-detail--item'>
							Trạng thái: Nghỉ không phép
						</div>
					</>
				);
			default:
				return (
					<>
						<div className='timesheet-detail--item'>Ngày: {data[1]}</div>
						<div className='timesheet-detail--item'>Trạng thái: Ngày nghỉ</div>
					</>
				);
		}
	};
	return (
		<motion.div
			className='timesheet-detail'
			variants={variants}
			initial='hidden'
			animate='visible'
			exit='exit'
		>
			<div className='title'>Chi tiết</div>
			<div className='timesheet-detail--data'>
				{timesheetDetailItem === undefined || timesheetDetailItem.length === 0
					? 'Chưa có dữ liệu'
					: handleData(timesheetDetailItem)}
			</div>
		</motion.div>
	);
}
