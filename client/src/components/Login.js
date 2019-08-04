import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authActions'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault
    const { email, password } = this.state

    this.props.login({ email, password })
  }

  render() {
    return (
      <React.Fragment>
        <pre className='form-state' >
          {JSON.stringify(this.state)}
        </pre>
        <form>
          <label htmlFor='email'>
            Email: 
            <input
              type='email'
              id='email'
              name='email'
              onChange={this.handleChange}
              value={this.state.email}
            />
          </label>
          <label htmlFor='password'>
            Password: 
            <input
              type='password'
              id='password'
              name='password'
              onChange={this.handleChange}
              value={this.state.password}
            />
          </label>
        </form>
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
