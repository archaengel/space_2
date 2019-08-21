import axios from 'axios'
import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  EDIT_POST,
  POST_LOADED,
  POST_LOADING,
} from './types'
import {tokenConfig} from './authActions'

export const getPosts = () => (dispatch, getState) => {
  dispatch ({type: POST_LOADING})
  axios
    .get ('/api/posts/user', tokenConfig (getState))
    .then (res => {
      dispatch ({
        type: GET_POSTS,
        payload: res.data,
      })
      dispatch ({type: POST_LOADED})
    })
}

export const addPost = post => (dispatch, getState) => {
  axios
    .post ('/api/posts', post, tokenConfig (getState))
    .then (res => {
      dispatch ({
        type: ADD_POST,
        payload: res.data,
      })
    })
}

export const deletePost = id => (dispatch, getState) => {
  console.log (id)
  axios
    .delete (`/api/posts/${id}`, tokenConfig (getState))
    .then (res => {
      dispatch ({
        type: DELETE_POST,
        payload: id,
      })
    })
}

export const editPost = post => (dispatch, getState) => {
  axios
    .patch ('/api/posts/edit', post, tokenConfig (getState))
    .then (res => {
      dispatch ({
        type: EDIT_POST,
        payload: res.data,
      })
    })
}
