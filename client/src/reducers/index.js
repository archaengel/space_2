import { combineReducers } from 'redux'
import planetReducer from './planetReducer'
import authReducer from './authReducer'
import postReducer from './postReducer'
import errorReducer from './errorReducer'

export default combineReducers({
  planet: planetReducer,
  auth: authReducer,
  post: postReducer,
  error: errorReducer
})
