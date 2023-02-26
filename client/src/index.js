import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/state'

import App from './App'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import 'assets/css/loading.css'
import { load, save } from 'redux-localstorage-simple'
import './index.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

library.add(fas)

const reduxLocalStorageConfig = {
  namespace: 'thunderspace-redux-state'
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducers,
  load(reduxLocalStorageConfig),
  composeEnhancers(applyMiddleware(thunk, save(reduxLocalStorageConfig)))
)

window.store = store

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
