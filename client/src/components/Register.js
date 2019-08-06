import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register, loadUser } from '../actions/authActions'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
import Login from './Login'

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      password: '',
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
    const { name, email, password } = this.state

    this.props.register({ name, email, password })
  }

  componentDidUpdate() {
    this.props.loadUser()
  }

  render() {
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
            htmlFor='name'
          >
            Name: 
            <input
              className='planet-input'
              name='name'
              id='name'
              type='text'
              onChange={this.handleChange}
              value={this.state.name}
            />
          </label>
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
            value='register'
          />
        </form>
        <p>
          Already have an account?
          <Link to='/login' >Sign In</Link>
        </p>
        { this.props.auth.isAuthenticated ? <Redirect to='/' /> : null }
      </React.Fragment>
    )
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { register, loadUser })(Register)
