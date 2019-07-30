import React from 'react'

import PostList from './PostList'
import PlanetList from './PlanetList'
import PlanetForm from './PlanetForm'

const Body = () => {
  return (
    <React.Fragment>
      <PostList />
      <PlanetList />
      <PlanetForm />
    </React.Fragment>
  )
}

export default Body
