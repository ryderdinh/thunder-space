const initState = {
  _list: [],
  _count: 0,
  _isLoading: false,
  error: ''
}

const getHourBetweenTwoTimes = (value1, value2) => {
  return (Math.abs(value2 - value1) / 36e5).toFixed(1)
}

export default function timeKeeping(state = initState, action) {
  let payload = action?.payload

  switch (action.type) {
    case 'SET_DATA_TIME_KEEPING':
      const now = new Date()
      let current, period
      const todayTimeline =
        ((payload[now.getFullYear()] || {})[now.getMonth() + 1] || {})[
          now.getDate()
        ] || []

      if (!todayTimeline.length) return { ...state }

      current = todayTimeline[todayTimeline.length - 1]?.time
      period = getHourBetweenTwoTimes(current, todayTimeline[0].time)

      return {
        ...state,
        _list: todayTimeline.reverse(),
        _count: period,
        _isLoading: false,
        error: ''
      }
    case 'SET_TIME_KEEPING_LOADING':
      return {
        ...state,
        _isLoading: true,
        error: ''
      }
    case 'SET_TIME_KEEPING_ERROR':
      return {
        ...state,
        _isLoading: false,
        error: action.payload
      }
    default:
      return { ...state }
  }
}
