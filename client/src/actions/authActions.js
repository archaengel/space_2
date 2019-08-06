import axios from 'axios'

import {
  USER_LOADING,
  USER_LOADED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  AUTH_ERROR
} from './types'

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
  // Set user loading
  dispatch({ type: USER_LOADING })

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res => 
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      console.log('loadUser Error: ' + err)
      dispatch({
        type: AUTH_ERROR
      })
    })
}

// Register user
export const register = ({ name, email, password }) => dispatch => {

  // Config headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  // Request body
  const body = JSON.stringify({ name, email, password })

  axios
    .post('/api/users', body, config)
    .then(res => 
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      console.log('register Error: ' + err)
      dispatch({
        type: REGISTER_FAIL
      })
    })
}

// Login user
export const login = ({ email, password }) => dispatch => {
  // Config headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  // Request body
  const body = { email, password }

  axios
    .post('/api/auth', body, config)
    .then(res => 
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      console.log('login Error: ' + err)
      dispatch({
        type: LOGIN_FAIL
      })
    })
}

// Logout User
export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  })
}

export const tokenConfig = (getState) => {
  // Get token from localStorage
  const token = getState().auth.token
  
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  }

  // If there is a token, add it to headers object
  if (token) {
    config.headers['x-auth-token'] = token
  }

  return config
}
