import { combineReducers } from 'redux'
import planetReducer from './planetReducer'
import authReducer from './authReducer'

export default combineReducers({
  planet: planetReducer,
  auth: authReducer
})
