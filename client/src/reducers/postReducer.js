import {
  GET_POSTS,
  DELETE_POST,
  ADD_POST,
  EDIT_POST,
  POST_LOADED,
  POST_LOADING,
} from '../actions/types'

const initialState = {
  posts: [],
  isLoading: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [...action.payload],
      }
    case POST_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case POST_LOADED:
      return {
        ...state,
        isLoading: false,
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter (post => post._id !== action.payload),
      }
    case EDIT_POST:
      /* eslint-disable-next-line */
      const filteredState = state.posts.filter (post => post._id !== action.payload._id)
      return {
        ...state,
        posts: [{...action.payload}, ...filteredState],
      }
    default:
      return state
  }
}
