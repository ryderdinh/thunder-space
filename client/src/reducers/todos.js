import {
  SET_TODOS_DATA,
  SET_TODOS_ERROR,
  SET_TODOS_LOADING,
  UPDATE_TODOS_DATA
} from 'constants/action'

const initState = {
  _data: {
    todo: {
      cards: [
        {
          numTask: 2,
          _id: '1',
          title: 'task1',
          status: 'doing',
          pin: false,
          description: 'abc',
          createdAt: '2023-03-22T08:34:13.797Z',
          updatedAt: '2023-03-22T08:34:13.797Z'
        },
        {
          numTask: 2,
          _id: '2',
          title: 'task2',
          status: 'doing',
          pin: false,
          description: 'abc',
          createdAt: '2023-03-22T08:34:13.797Z',
          updatedAt: '2023-03-22T08:34:13.797Z'
        },
        {
          numTask: 2,
          _id: '3',
          title: 'task3',
          status: 'doing',
          pin: false,
          description: 'abc',
          createdAt: '2023-03-22T08:34:13.797Z',
          updatedAt: '2023-03-22T08:34:13.797Z'
        }
      ],
      cardOrder: ['1', '2', '3']
    },
    doing: { cards: [], cardOrder: [] },
    completed: { cards: [], cardOrder: [] }
  },
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
      return {
        isLoading: false,
        error: '',
        _data: payload
      }
    }
    case UPDATE_TODOS_DATA: {
      return {
        isLoading: false,
        error: '',
        _data: { ...state._data, [payload.colName]: payload.data }
      }
    }
    default:
      return { ...state }
  }
}
