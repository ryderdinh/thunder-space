const initState = {
  data: [],
  isLoadding: false,
  error: ''
}

export default function events(state = initState, action) {
  switch (action.type) {
    case 'SET_EVENTS_LOADING':
      return { ...state, isLoadding: action.payload }
    case 'SET_EVENTS':
      let events = action.payload
      let listEvent = []

      if (events) {
        let i = 0
        while (i <= events.length - 1) {
          let event = [events[i]]

          let j = i + 1
          while (j < events.length) {
            if (events[i].date === events[j].date) {
              event = [...event, events[j]]
              events.splice(j, 1)
            } else ++j
          }

          listEvent = [...listEvent, event]
          ++i
        }
      }

      return { ...state, data: listEvent, isLoadding: false }
    default:
      return { ...state }
  }
}
