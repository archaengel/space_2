import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      msg: null,
      redirectToReferrer: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { email, password } = this.state

    this.props.login({ email, password })
  }

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props

    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        console.log(error.msg)
        this.setState({ msg: error.msg })
      } else {
        this.setState({ msg: null })
      }
    }

    if (isAuthenticated) {
      this.setState({ redirectToReferrer: true })
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' }}
    const { redirectToReferrer, msg } = this.state
    return (
      <React.Fragment>
        { msg ? (<div className='auth-alert'>{msg}</div>) : null }
        <pre className='form-state' >
          {JSON.stringify(this.state, null, 2)}
        </pre>
        <form
          className='planet-form'
          onSubmit={this.handleSubmit}
        >
          <label
            className='planet-input-label'
            htmlFor='email'
          >
            Email: 
          </label>
          <input
            className='planet-input'
            type='email'
            id='email'
            name='email'
            onChange={this.handleChange}
            value={this.state.email}
          />
          <label
            className='planet-input-label'
            htmlFor='password'
          >
            Password: 
          </label>
          <input
            className='planet-input'
            type='password'
            id='password'
            name='password'
            onChange={this.handleChange}
            value={this.state.password}
          />
          <input
            className='planet-button'
            type='submit'
            value='login'
          />
        </form>
        <footer className='auth-footer'>
          <p>
            Don't have an account yet?
          </p>
          <Link to='/register' >Sign Up.</Link>
        </footer>
        { redirectToReferrer ? <Redirect to={from} /> : null }
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(Login)
