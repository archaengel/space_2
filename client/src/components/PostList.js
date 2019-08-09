import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../actions/postActions'
import { loadUser } from '../actions/authActions'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'

import PostListItem from './PostListItem'

class PostList extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { posts } = this.props.post
    const { location } = this.props
    const { isAuthenticated, user } = this.props.auth
    return (
     isAuthenticated ? 
      (<ul className='planet-list'>
        <h2>{ user.name }'s Diary</h2>
        {
          posts.map(post => (
            <PostListItem key={post._id} {...post}/>
          ))
        }
        <Link to={{
          pathname: '/posts/edit',
          state: { from: location }
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
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth
})

export default withRouter(connect( mapStateToProps, { getPosts, loadUser })(PostList))
