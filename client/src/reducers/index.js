import {combineReducers} from 'redux'
import planetReducer from './planetReducer'
import authReducer from './authReducer'
import postReducer from './postReducer'
import errorReducer from './errorReducer'
import verifReducer from './verifReducer'

export default combineReducers ({
  planet: planetReducer,
  auth: authReducer,
  post: postReducer,
  error: errorReducer,
  verif: verifReducer,
})
