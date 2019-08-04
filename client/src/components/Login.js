import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../actions/authActiions'
import PropTypes from 'prop-types'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange() {
    this.setState(state => {
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
      <p>
        Login
      </p>
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
