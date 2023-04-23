import reducers from 'reducers/state'
import { applyMiddleware, compose, createStore } from 'redux'
import { load, save } from 'redux-localstorage-simple'
import thunk from 'redux-thunk'
const reduxLocalStorageConfig = {
  ignoreStates: ['_timeOfAttendance', '_todos'],
  debounce: 500,
  namespace: 'thunderspace-redux-state'
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducers,
  load(reduxLocalStorageConfig),
  composeEnhancers(applyMiddleware(thunk, save(reduxLocalStorageConfig)))
)
window.store = store

export default store
