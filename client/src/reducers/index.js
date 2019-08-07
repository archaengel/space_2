import { combineReducers } from 'redux'
import planetReducer from './planetReducer'
import authReducer from './authReducer'
import postReducer from './postReducer'

export default combineReducers({
  planet: planetReducer,
  auth: authReducer,
  post: postReducer
})
