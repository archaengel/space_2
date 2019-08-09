import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePost } from '../actions/postActions'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

class PostListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: false
    }

    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  onDeleteClick(id) {
    this.props.deletePost(id)
  }

  render() {
    const {title, body, createdAt, _id, location} = this.props
    return (
      <li className="post-list-item" >
        <header className='post-header'>
          <hgroup className='post-hgroup'>
            <h3 className='post-title'>{title}</h3>
            <h6 className='post-date-byline'>{createdAt}</h6>
          </hgroup>
          <div
            className="delete-post-button dropdown"
          >
            <input
              className='mobile-menu-check'
              type='checkbox'
              id={_id}
            />
            <label htmlFor={_id}>
              <span className='drop-trigger'>***</span>
            </label>
            <ul className='drop-menu'>
              <li onClick={this.onEditClick}>
                <Link 
                  className='edit-link'
                  to={{
                    pathname: '/posts/edit',
                    state: {
                      from: location,
                      post: { _id, body, title }
                    }
                  }}>edit</Link>
              </li>
              <li>
                <button
                  onClick={this.onDeleteClick.bind(this, _id)}
                  className='delete-post-link'
                >
                  delete
                </button>
              </li>
            </ul>
          </div>
        </header>
        <pre className='post-body'>
          {body}
        </pre>
      </li>
    )
  }
}

PostListItem.propTypes = {
  deletePost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  planet: state.planet
})

export default withRouter(connect(mapStateToProps, { deletePost })(PostListItem))
