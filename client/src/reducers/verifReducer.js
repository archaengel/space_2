import {
  VERIF_BEGIN,
  VERIF_SUCCESS,
  VERIF_FAIL,
  VERIF_ERROR,
} from '../actions/types'

const initialState = {
  token: '',
  isVerfied: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case VERIF_FAIL:
    case VERIF_ERROR:
      return {
        token: '',
        isVerfied: false,
      }
    case VERIF_BEGIN:
      return {
        ...state,
        token: action.payload.token,
      }
    case VERIF_SUCCESS:
      return {
        token: '',
        isVerfied: true,
      }
    default:
      return state
  }
}
