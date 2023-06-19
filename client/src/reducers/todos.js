import {
  ADD_TODOS_ITEM,
  REMOVE_TODOS_ITEM,
  SET_TODOS_DATA,
  SET_TODOS_DATA_ITEM,
  SET_TODOS_ERROR,
  SET_TODOS_LOADING,
  SWITCH_TODOS_ITEM,
  UPDATE_TODOS_DATA
} from 'constants/action'

const initState = {
  _data: {
    todo: {
      cards: [],
      cardOrder: []
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
    case SET_TODOS_DATA_ITEM: {
      return {
        isLoading: false,
        error: '',
        _data: {
          ...state._data,
          [payload.colName]: {
            ...state._data[payload.colName],
            cards: state._data[payload.colName].cards.map((card) =>
              card._id === payload.id ? { ...card, ...payload.data } : card
            )
          }
        }
      }
    }
    case ADD_TODOS_ITEM: {
      const isHaveTodo = state._data[payload.colName].cardOrder.some(
        (x) => x === payload.data._id
      )

      if (isHaveTodo)
        return {
          isLoading: false,
          error: '',
          _data: state._data
        }

      return {
        isLoading: false,
        error: '',
        _data: {
          ...state._data,
          [payload.colName]: {
            cards: [...state._data[payload.colName].cards, payload.data],
            cardOrder: [
              ...state._data[payload.colName].cardOrder,
              payload.data._id
            ]
          }
        }
      }
    }
    case UPDATE_TODOS_DATA: {
      return {
        isLoading: false,
        error: '',
        _data: { ...state._data, [payload.colName]: payload.data }
      }
    }
    case REMOVE_TODOS_ITEM: {
      return {
        isLoading: false,
        error: '',
        _data: {
          ...state._data,
          [payload.colName]: {
            cards: state._data[payload.colName].cards.filter(
              (card) => card._id !== payload.id
            ),
            cardOrder: state._data[payload.colName].cardOrder.filter(
              (id) => id !== payload.id
            )
          }
        }
      }
    }
    case SWITCH_TODOS_ITEM: {
      const cloneTodo = state._data[payload.currentCol].cards.find(
        (x) => x._id === payload.id
      )
      return {
        isLoading: false,
        error: '',
        _data: {
          ...state._data,
          [payload.currentCol]: {
            cards: state._data[payload.currentCol].cards.filter(
              (card) => card._id !== payload.id
            ),
            cardOrder: state._data[payload.currentCol].cardOrder.filter(
              (id) => id !== payload.id
            )
          },
          [payload.newCol]: {
            cards: [cloneTodo, ...state._data[payload.newCol].cards],
            cardOrder: [payload.id, ...state._data[payload.newCol].cardOrder]
          }
        }
      }
    }
    default:
      return { ...state }
  }
}
