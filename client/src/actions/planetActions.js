import axios from 'axios'
import { GET_PLANETS, ADD_PLANET, DELETE_PLANET } from './types'

export const getPlanets = () => (dispatch) => {
  axios
    .get('/api/planets')
    .then(res => {
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

export const deletePlanet = (id) => (dispatch) => {
  axios
    .delete(`/api/planets/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_PLANET,
        payload: id
      })
    })
}
