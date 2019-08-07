import React from 'react'
import { Link } from 'react-router-dom'
import { loadUser, logout } from '../actions/authActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const AuthButton = (props) => {
  return (
    <div className='auth-button-wrapper'>
      {
        props.auth.isAuthenticated ?
        <button
          className='nav-button'
          onClick={props.logout}
        >
          logout
        </button> :
        <>
          <Link className="nav-link" to='/register'>Sign Up</Link>
          <Link className="nav-link" to='/login'>Sign In</Link>
        </>
      }
    </div>
  )
}

AuthButton.propTypes = {
  loadUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { loadUser, logout })(AuthButton)

