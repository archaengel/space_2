import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../actions/postActions'
import PropTypes from 'prop-types'

class PostForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      body: ''
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
      body: this.state.body
    }
    if (newPost) {
      this.props.addPost(newPost)
    }
    this.setState({title: '', body: ''})
  }

  componentDidUpdate() {
    this.boxRef.current.scrollIntoView()
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
    return (
      <React.Fragment>
        <pre className="form-state">
          {JSON.stringify(this.state)}
        </pre>
        <form onSubmit={this.handleSubmit} className="planet-form">
          <label
            className="planet-input-label"
            htmlFor='title'
          >
            Title: 
            <input
              className="planet-input"
              type='text'
              id='title'
              name='title'
              placeholder='Title'
              onChange={this.handleChange}
              value={this.state.title}
            />
          </label>
          <label
            className='planet-input-label'
            htmlFor='body'
          >
          Body: 
          <input
            className='planet-input'
            id='body'
            name='body'
            type='text-area'
            placeholder='Body'
            onChange={this.handleChange}
            value={this.state.body}
          />
          </label>
          <input
            className="planet-button"
            type='submit'
            value='add Planet'
            ref={this.boxRef}
          />
        </form>
      </React.Fragment>
    )
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.post
})

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm)
