import {
  SET_TODOS_DATA,
  SET_TODOS_ERROR,
  SET_TODOS_LOADING
} from 'constants/action'

const initState = {
  _data: [],
  isLoading: false,
  error: ''
}

export default function todoReducer(state = initState, action) {
  let { type, payload } = action

  switch (type) {
    case SET_TODOS_LOADING: {
      return { ...state, isLoading: payload || true }
    }
    case SET_TODOS_ERROR: {
      return { ...state, isLoading: false, error: payload }
    }
    case SET_TODOS_DATA: {
      return { ...state, isLoading: false, error: '', _data: payload || [] }
    }
    default:
      return { ...state }
  }
}
