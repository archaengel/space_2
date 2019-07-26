import { GET_PLANETS } from '../actions/types'

const initialState = {
  planets: [
    "venus",
    "mercury"
  ]
}

export default function(state = initialState, action) {
  switch (action.types) {
    case GET_PLANETS:
      return {
        ...state
      }
    default:
      return state
  }
}
