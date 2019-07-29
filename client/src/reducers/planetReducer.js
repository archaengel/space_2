import { GET_PLANETS, ADD_PLANET } from '../actions/types'

const initialState = {
  planets: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PLANETS:
      return {
        ...state,
        planets: [...action.payload]
      }
    case ADD_PLANET:
      return {
        ...state,
        planets: [action.payload, ...state.planets]
      }
    default:
      return state
  }
}
