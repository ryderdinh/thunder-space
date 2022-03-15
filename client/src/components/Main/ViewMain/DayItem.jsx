import { setDataTimesheetsDetail } from 'actions';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export default function DayItem({ dateRelative, numberDay }) {
	const [state, setState] = useState({
		classLabel: '',
		classSpan: '',
		dd: 0,
		mm: 0
	});

	const dispatch = useDispatch();

	useEffect(() => {
		if (numberDay < 1)
			setState(preState => ({ ...preState, classLabel: 'invalid' }));

		if (numberDay === new Date().getDate())
			setState(preState => ({ ...preState, classSpan: 'now' }));

		if (numberDay > 0) {
			setState(preState => ({
				...preState,
				dd: dateRelative.day < 10 ? `0${dateRelative.day}` : dateRelative.day,
				mm:
					dateRelative.month < 10
						? `0${dateRelative.month}`
						: dateRelative.month
			}));
		}
	}, [dateRelative.day, dateRelative.month, numberDay]);

	return (
		<label
			className={`day ${state.classLabel} animate__slow animate__delay-3s animate__fadeIn`}
			onClick={() => {
				dispatch(
					setDataTimesheetsDetail(
						`${state.dd}/${state.mm}/${dateRelative.year}`
					)
				);
			}}
		>
			<span className={state.classSpan}>{numberDay}</span>
			<em></em>
		</label>
	);
}
