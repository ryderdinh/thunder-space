const initialState = {
  _data: [],
  isLoading: false,
  error: ''
}

export default function notification(state = initialState, action) {
  switch (action.type) {
    case 'SET_NOTIFICATION_DATA':
      return { ...state, _data: action.payload, isLoading: false, error: '' }
    case 'ADD/MODIFIED_NOTIFICATION_DATA':
      let newData = [...state._data]
      for (let item of action.payload) {
        let index = newData.findIndex((x) => x._id === item._id)
        if (index > -1) {
          newData[index] = item
        } else {
          newData.push(item)
        }
      }
      return { ...state, _data: newData, isLoading: false, error: '' }
    case 'SET_NOTIFICATION_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_NOTIFICATION_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'SET_NOTIFICATION_READ':
      let id = action.payload
      let _dataRead = state._data.map((item) => ({
        ...item,
        read: item.id === id ? true : item.read
      }))

      return { ...state, _data: _dataRead, isLoading: false, error: '' }
    case 'SET_NOTIFICATION_READ_ALL':
      let _dataReadAll = state._data.map((item) => ({ ...item, read: true }))

      return { ...state, _data: _dataReadAll, isLoading: false, error: '' }
    default:
      return { ...state }
  }
}
