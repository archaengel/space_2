import React from 'react'

import ApiList from './ApiList'
import PlanetList from './PlanetList'
import PlanetForm from './PlanetForm'
import PostList from './PostList'
import PostForm from './PostForm'

const Body = () => {
  return (
    <React.Fragment>
      <ApiList />
      <PlanetList />
      <PlanetForm />
      <PostList />
      <PostForm />
    </React.Fragment>
  )
}

export default Body
