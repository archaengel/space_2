import React, {Component} from 'react'
import {connect} from 'react-redux'
import {register} from '../actions/authActions'
import {clearErrors, returnErrors} from '../actions/errorActions'
import PropTypes from 'prop-types'
import {Redirect, Link} from 'react-router-dom'

class Register extends Component {
  constructor(props) {
    super (props)

    this.state = {
      name: '',
      email: '',
      password: '',
      confirmation: '',
      msg: null,
    }

    this.handleChange = this.handleChange.bind (this)
    this.handleSubmit = this.handleSubmit.bind (this)
  }

  handleChange(e) {
    this.setState ({
      [e.target.name]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault ()
    const {name, email, password, confirmation} = this.state

    if (password !== confirmation) {
      this.props.returnErrors (
        {msg: 'Passwords do not match'}, 401, 'REGISTER_FAIL')
    } else {
      this.props.register ({name, email, password})
    }
  }

  componentDidUpdate(prevProps) {
    const {error} = this.props

    if (error !== prevProps.error) {
      if (error.id === 'REGISTER_FAIL') {
        this.setState ({msg: error.msg})
      } else {
        this.setState ({msg: null})
      }
    }
  }

  render() {
    const {msg} = this.state
    return (
      <React.Fragment>
        { msg ? (<div className='auth-alert'>{msg}</div>) : null }
        <form
          className='planet-form'
          onSubmit={this.handleSubmit}
        >
          <label
            className='planet-input-label'
            htmlFor='name'
          >
            Name:
          </label>
          <input
            className='planet-input'
            name='name'
            id='name'
            type='text'
            onChange={this.handleChange}
            value={this.state.name}
          />
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
          <label
            className='planet-input-label'
            htmlFor='password-confirmation'
          >
            Password Confirmation:
          </label>
          <input
            className='planet-input'
            type='password'
            id='password-confirmation'
            name='confirmation'
            onChange={this.handleChange}
            value={this.state.confirmation}
          />
          <input
            className='planet-button'
            type='submit'
            value='register'
          />
        </form>
        <footer className='auth-footer'>
          <p>
            Already have an account?
          </p>
          <Link to='/login' >Sign In.</Link>
        </footer>
        { this.props.isAuthenticated ? <Redirect to='/' /> : null }
      </React.Fragment>
    )
  }
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  returnErrors: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
})

export default connect (
  mapStateToProps,
  {register, clearErrors, returnErrors}) (Register)
