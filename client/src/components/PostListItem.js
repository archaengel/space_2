import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePost } from '../actions/postActions'
import PropTypes from 'prop-types'

class PostListItem extends Component {
  constructor(props) {
    super(props)

    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps._id !== this.props._id)
  }

  onDeleteClick(id) {
    this.props.deletePost(id)
  }

  render() {
    const {title, body, createdAt, _id} = this.props
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
              type='checkbox'
              id='mobile-menu-check'
            />
            <label htmlFor='mobile-menu-check'>
              <span className='drop-trigger'>***</span>
            </label>
            <ul className='drop-menu'>
              <li
                onClick={this.onDeleteClick.bind(this, _id)}
              >delete</li>
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

export default connect(mapStateToProps, { deletePost })(PostListItem)
