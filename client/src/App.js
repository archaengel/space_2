import React from 'react'

import { Provider } from 'react-redux'
import store from './store'

import 'normalize.css'
import './styles/app.css'

import Header from './components/Header'
import Body from './components/Body'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <Body />
      </div>
    </Provider>
  )
}

export default App
