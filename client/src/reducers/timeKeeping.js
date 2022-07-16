const initState = {
  _list: [],
  _count: 0,
  _status: false,
  _isLoading: false
}

let getHourBetweenTwoTimes = (value1, value2) => {
  return (Math.abs(value2 - value1) / 36e5).toFixed(1)
}

export default function timeKeeping(state = initState, action) {
  switch (action.type) {
    case 'SET_DATA_TIME_KEEPING':
      return {
        ...state,
        _list: action.payload,
        _isLoading: false
      }
    case 'SET_TIME_KEEPING':
      let current, period
      if (!action.payload.length) return { ...state }

      current = action.payload[action.payload.length - 1][0]
      period = getHourBetweenTwoTimes(current + '', action.payload[0][0] + '')

      return {
        ...state,
        _count: period,
        _status: true
      }
    case 'SET_TIME_KEEPING_LOADING':
      return {
        ...state,
        _isLoading: true
      }
    default:
      return { ...state }
  }
}
