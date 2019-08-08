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
        <h3 className='post-title'>{title}</h3>
        <h6 className='post-date-byline'>{createdAt}</h6>
        <p className='post-body'>
          {body}
        </p>
        <footer className='post-footer'>
          <div className='post-date'>
            {createdAt}
          </div>
          <button className="delete-post-button" onClick={this.onDeleteClick.bind(this, _id)}>
            &times;
          </button>
        </footer>
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
