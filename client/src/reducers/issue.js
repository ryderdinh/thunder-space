const initState = {
  _data: { name: 'Issue...' },
  isLoading: false,
  error: ''
}

export default function issue(state = initState, action) {
  switch (action.type) {
    case 'SET_INITIAL_ISSUE':
      return { ...state, _data: action.payload }
    case 'SET_DATA_ISSUE':
      return { ...state, _data: action.payload, isLoading: false, error: '' }
    case 'SET_ISSUE_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ISSUE_ERROR':
      return { ...state, error: action.payload, isLoading: false }

    default:
      return { ...state }
  }
}
