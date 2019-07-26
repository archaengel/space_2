import React from 'react'

import PostList from './PostList'
import ShoppingList from './ShoppingList'

const Body = () => {
  return (
    <React.Fragment>
      <PostList />
      <ShoppingList />
    </React.Fragment>
  )
}

export default Body
