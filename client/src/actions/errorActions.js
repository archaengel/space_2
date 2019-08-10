import axios from 'axios'
import {
  CLEAR_ERRORS,
  GET_ERRORS
} from './types'

export const returnErrors = ( msg, status, id = null ) => {
  console.log(msg.msg)
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}
