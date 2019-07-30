import axios from 'axios'
import { GET_PLANETS, ADD_PLANET } from './types'

export const getPlanets = () => (dispatch) => {
  axios
    .get('/api/planets')
    .then(res => {
      console.log('res: ' + res.data)
      dispatch({
        type: GET_PLANETS,
        payload: res.data
      })
    })
}

export const addPlanet = (planet) => (dispatch) => {
  axios
    .post('/api/planets', planet)
    .then(res => {
      dispatch({
        type: ADD_PLANET,
        payload: res.data
      })
    })
}
