import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import 'assets/css/loading.css'
import LayoutContextProvider from 'context/LayoutContext'
import { BrowserRouter } from 'react-router-dom'
import store from 'store'
import './index.css'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)

library.add(fas)

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <LayoutContextProvider>
        <App />
      </LayoutContextProvider>
    </BrowserRouter>
  </Provider>
)
