import React from 'react'

import ApiList from './ApiList'
import PlanetList from './PlanetList'
import PlanetForm from './PlanetForm'
import PostList from './PostList'

const Body = () => {
  return (
    <React.Fragment>
      <ApiList />
      <PlanetList />
      <PlanetForm />
    </React.Fragment>
  )
}

export default Body
