import { GET_PLANETS, ADD_PLANET, DELETE_PLANET } from '../actions/types'

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
    case DELETE_PLANET:
      return {
        ...state,
        planets: state.planets.filter((planet) => planet._id !== action.payload)
      }
    default:
      return state
  }
}
