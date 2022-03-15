const initState = {
	active: false
};

export default function sidebar(state = initState, action) {
	switch (action.type) {
		case 'TOGGLE_ACTIVE_SIDEBAR':
			return { ...state, active: action.payload };
		default:
			return { ...state };
	}
}
