const initState = {
  _staffInfomation: {
    name: '.',
    birthday: '.',
    phonenumber: '.',
    position: '.',
    department: '.',
    email: '.',
    _id: null
  }
}
export default function staffInfomation(state = initState, action) {
  switch (action.type) {
    case 'SET_STAFF_INFOMATION': {
      return {
        ...state,
        _staffInfomation: action.payload
      }
    }
    default:
      return { ...state }
  }
}
