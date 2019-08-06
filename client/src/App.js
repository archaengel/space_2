import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store'

import 'normalize.css'
import './styles/app.css'

import Header from './components/Header'
import Body from './components/Body'
import Register from './components/Register'
import Login from './components/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={Body} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
          </Switch>
        </div>
      </Provider>
    </BrowserRouter>
  )
}

export default App
