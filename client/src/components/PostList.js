import React, {Component, Suspense, lazy} from 'react'
import {connect} from 'react-redux'
import {getPosts} from '../actions/postActions'
import {loadUser} from '../actions/authActions'
import PropTypes from 'prop-types'

import {Link, withRouter} from 'react-router-dom'

const PostListItem = lazy (() => import ('./PostListItem'))

class PostList extends Component {
  constructor(props) {
    super (props)
  }

  componentDidMount() {
    this.props.getPosts ()
  }

  render() {
    const {posts} = this.props.post
    const {location} = this.props
    const {isAuthenticated, user} = this.props.auth
    return (
     isAuthenticated ?
      (<ul className='planet-list'>
        <h2>{ user.name }&apos;s Diary</h2>
        {
          posts.map (post => (
            <Suspense
              key={post._id}
              fallback={<div className='logo dummy-center'>Loading...</div>} >
              <PostListItem key={post._id} {...post}/>
            </Suspense>
          ))
        }
        <Link
          className='create-post-button'
          to={{
          pathname: '/posts/add',
          state: {from: location},
        }}>Create New Entry</Link>
      </ul>) :
      (<ul className='planet-list'>
        <h2>Diary</h2>
        <p className='post-list-unauth'>Log in to see your diary.</p>
      </ul>)
    )
  }
}

PostList.propTypes = {
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  location: PropTypes.object,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth,
})

export default withRouter (
  connect (mapStateToProps, {getPosts, loadUser}) (PostList))
