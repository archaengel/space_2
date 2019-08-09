import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
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
    this.setState({ redirectToReferrer: true })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' }}
    const { redirectToReferrer } = this.state
    const { isAuthenticated } = this.props.auth
    return (
      <React.Fragment>
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
            <input
              className='planet-input'
              type='email'
              id='email'
              name='email'
              onChange={this.handleChange}
              value={this.state.email}
            />
          </label>
          <label
            className='planet-input-label'
            htmlFor='password'
          >
            Password: 
            <input
              className='planet-input'
              type='password'
              id='password'
              name='password'
              onChange={this.handleChange}
              value={this.state.password}
            />
          </label>
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
        { isAuthenticated && redirectToReferrer ? <Redirect to={from} /> : null }
      </React.Fragment>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { login })(Login)
