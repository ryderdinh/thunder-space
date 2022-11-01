const initState = {
  _data: {},
  isLoading: false,
  error: ''
}

export default function timesheets(state = initState, action) {
  let { type, payload } = action

  switch (type) {
    case 'SET_LOADING_TIMESHEETS': {
      return { ...state, isLoading: payload }
    }
    case 'SET_ERROR_TIMESHEETS': {
      return { ...state, isLoading: false, error: payload }
    }
    case 'SET_DATA_TIMESHEETS': {
      return { ...state, isLoading: false, error: '', _data: payload }
    }
    default:
      return { ...state }
  }
}
