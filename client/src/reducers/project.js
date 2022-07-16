const initState = {
  _dataProject: { name: 'Project...' },
  _dataProjects: [],
  _dataProjectDetail: {},
  isLoading: false,
  error: null
}

export default function project(state = initState, action) {
  switch (action.type) {
    case 'SET_PROJECT_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'SET_PROJECT_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    case 'SET_DATA_PROJECT':
      return { ...state, _dataProject: action.payload, isLoading: false }
    case 'SET_DATA_PROJECTS':
      return { ...state, _dataProjects: action.payload, isLoading: false }
    case 'SET_INITIAL_PROJECT':
      return { ...state, _dataProject: action.payload }

    default:
      return { ...state }
  }
}
