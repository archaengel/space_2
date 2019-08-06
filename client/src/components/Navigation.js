import React from 'react'
import { NavLink } from 'react-router-dom'
import { loadUser, logout } from '../actions/authActions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Navigation = (props) => {
  return (
    <nav>
      <a className="nav-link" href="#" >NASA</a>
      <a className="nav-link" href="#" >About</a>
      <a className="nav-link" href="#" >Contact</a>
      {
        props.auth.isAuthenticated ?
        <button
          className='nav-button'
          onClick={props.logout}
        >
          logout
        </button> :
        <NavLink className="nav-link" to='/register'>Register</NavLink>
      }
    </nav>
  )
}

Navigation.propTypes = {
  loadUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { loadUser, logout })(Navigation)

