import React, {Suspense, lazy} from 'react'

const ApiContainer = lazy (() => import ('./ApiContainer'))

const PostList = () => (
    <React.Fragment>
      <Suspense fallback={<div className='logo dummy-center'>Loading...</div>}>
        <ApiContainer />
      </Suspense>
    </React.Fragment>
  )

export default PostList
