import { GET_POSTS, DELETE_POST, ADD_POST } from '../actions/types'

const initialState = {
  posts: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [...action.payload]
      }
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload)
      }
    default:
      return state
  }
}
