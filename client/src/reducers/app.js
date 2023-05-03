import { SET_COOKIE } from 'constants/action'

const initState = {
  cookie: false
}

export default function app(state = initState, action) {
  switch (action.type) {
    case SET_COOKIE:
      return { ...state, cookie: action.payload }
    default:
      return { ...state }
  }
}
