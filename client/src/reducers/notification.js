const initialState = {
  _data: [
    {
      id: 1,
      title: 'Invite to join',
      content: "You have been invited to join the Thunder's project",
      time: 1657853474056,
      read: false,
      type: 'invite-to-project',
      tab: 'project',
      data: {
        pid: '1'
      }
    },
    {
      id: 2,
      title: 'Issue change',
      content: "Pham Huu Thang has changed the issue's status to In Progress",
      time: 1657894203163,
      read: true,
      type: 'change-issue',
      tab: 'issue',
      data: {
        iid: '1',
        pid: '2'
      }
    }
  ],
  isLoading: false,
  error: ''
}

export default function notification(state = initialState, action) {
  switch (action.type) {
    case 'SET_NOTIFICATION_DATA':
      return { ...state, _data: action.payload, isLoading: false, error: '' }
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
