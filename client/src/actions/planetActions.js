import { GET_PLANETS, ADD_PLANET } from './types'

export const getPlanets = () => {
  return {
    type: GET_PLANETS
  }
}

export const addPlanet = (planet) => {
  return {
    type: ADD_PLANET,
    payload: planet
  }
}
