import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editPost } from '../actions/postActions'
import PropTypes from 'prop-types'

import { Redirect } from 'react-router-dom'

class PostEditForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: props.location.state.post.title,
      body: props.location.state.post.body,
      id: props.location.state.post._id,
      redirectToReferrer: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.boxRef = React.createRef()
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    const newPost = {
      title: this.state.title,
      body: this.state.body,
      _id: this.state.id
    }
    if (newPost) {
      this.props.editPost(newPost)
    }
    this.setState({title: '', body: '', redirectToReferrer: true})
  }

  // Update if name is input or planet is added, but not deleted
  shouldComponentUpdate(nextProps, nextState) {
    const nextPosts = nextProps.post.posts
    const nextTitle = nextState.title
    const nextBody = nextState.body

    const currPosts = this.props.post.posts
    const currTitle = this.state.title
    const currBody = this.state.body

    const isLonger = nextPosts.length > currPosts.length
    const isTitleChanged = currTitle !== nextTitle
    const isBodyChanged = currBody !== nextBody

    return (isLonger || isBodyChanged || isTitleChanged)
  }

  render() {
    const { redirectToReferrer } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/' }}
    if (redirectToReferrer) return <Redirect to={from} />
    return (
      <React.Fragment>
        <pre className="form-state">
          {JSON.stringify(this.state, null, 2)}
        </pre>
        <form onSubmit={this.handleSubmit} className="post-form">
          <label
            className="post-input-label"
            htmlFor='title'
          >
            Title:
          </label>
          <input
            className="post-input"
            type='text'
            id='title'
            name='title'
            placeholder='***'
            onChange={this.handleChange}
            value={this.state.title}
            required
          />
          <label
            className='post-textarea-label'
            htmlFor='body'
          >
            Body:
          </label>
          <textarea
            className='post-textarea'
            id='body'
            name='body'
            placeholder='***'
            onChange={this.handleChange}
            value={this.state.body}
            rows='10'
            required
          />
          <input
            className="planet-button"
            type='submit'
            value='edit Post'
            ref={this.boxRef}
          />
        </form>
      </React.Fragment>
    )
  }
}

PostEditForm.propTypes = {
  editPost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { editPost }
)(PostEditForm)
