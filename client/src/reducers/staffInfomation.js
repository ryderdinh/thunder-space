const initState = {
  _data: {
    name: '.',
    birthday: '.',
    phonenumber: '.',
    position: '.',
    department: '.',
    email: '.',
    sex: '',
    _id: ''
  },
  isLoading: false,
  error: ''
}
export default function staffInfomation(state = initState, action) {
  switch (action.type) {
    case 'SET_STAFF_DATA': {
      return {
        _data: action.payload,
        isLoading: false,
        error: ''
      }
    }
    case 'SET_STAFF_LOADING': {
      return {
        ...state,
        isLoading: true
      }
    }
    case 'SET_STAFF_ERROR': {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    }
    default:
      return { ...state }
  }
}
