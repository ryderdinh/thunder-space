const initState = {
  auth: false
}

export default function checkLogin(state = initState, action) {
  switch (action.type) {
    case 'SET_CHECK_ID': {
      return { ...state, auth: action.payload }
    }
    default:
      return { ...state }
  }
}
