const initState = {
	_items: [
		[0, '01/07/2021', '08:50:21', '18:50:21'],
		[1, '02/03/2021', '08:50:21', '18:50:21'],
		[2, '03/03/2021', '08:50:21', '16:00:21'],
		[0, '04/03/2021', '08:50:21', '10:50:21'],
		[2, '05/07/2021', '0', '0'],
		[0, '29/03/2021', '08:50:21', '18:50:21'],
		[0, '07/03/2021', '08:50:21', '18:50:21'],
		[0, '05/03/2021', '08:50:21', '18:50:21'],
		[0, '05/03/2021', '08:50:21', '18:50:21']
	],
	_detailItem: []
};

const filterData = (main, valss) => {
	let result = main.filter(item => item[1] === valss);
	return result;
};
export default function timesheets(state = initState, action) {
	switch (action.type) {
		case 'SET_DATA_TIMESHEETS_DETAIL': {
			state._detailItem = filterData(state._items, action.payload);

			return { ...state };
		}
		default:
			return { ...state };
	}
}
