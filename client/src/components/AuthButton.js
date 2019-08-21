import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {loadUser, logout} from '../actions/authActions'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class AuthButton extends Component {
  constructor(props) {
    super (props)
  }

  componentDidMount() {
    this.props.loadUser ()
  }

  render() {
    const {isAuthenticated, logout, location} = this.props
    return (
      <div className='auth-button-wrapper'>
        {
          isAuthenticated ?
          <button
            className='nav-button'
            onClick={logout}
          >
            logout
          </button> :
          <>
            <Link className="nav-link" to={{
              pathname: '/register',
              state: {from: location},
            }}>Sign Up</Link>
            <Link className="nav-link" to={{
              pathname: '/login',
              state: {from: location},
            }}>Sign In</Link>
          </>
        }
      </div>
    )
  }

}

AuthButton.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  location: PropTypes.object,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default withRouter (
  connect (mapStateToProps, {loadUser, logout}) (AuthButton))
