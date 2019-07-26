import React from 'react'

import ApiContainer from './ApiContainer'

const PostList = () => {
  return (
    <React.Fragment>
      <ApiContainer />
      <ApiContainer date="2019-06-10" />
      <ApiContainer date="2019-06-08" />
    </React.Fragment>
  )
}

export default PostList
