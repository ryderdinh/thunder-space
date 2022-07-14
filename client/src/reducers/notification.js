const initialState = {
  _data: null,
  isLoading: false,
  error: ''
}

export default function notification(state = initialState, action) {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { ...state, _data: action.payload, isLoading: false, error: '' }
    case 'SET_NOTIFICATION_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_NOTIFICATION_ERROR':
      return { ...state, error: action.payload, isLoading: false }

    default:
      return { ...state }
  }
}
