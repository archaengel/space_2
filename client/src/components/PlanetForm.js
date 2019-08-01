import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPlanet } from '../actions/planetActions'
import PropTypes from 'prop-types'

class PlanetForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      planetName: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.boxRef = React.createRef()
  }

  handleChange(e) {
    this.setState({planetName: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault()
    const newPlanet = {
      name: this.state.planetName
    }
    if (newPlanet) {
      console.log(newPlanet.name)
      this.props.addPlanet(newPlanet)
    }
    this.setState({planetName: ''})
  }

  componentDidUpdate() {
    this.boxRef.current.scrollIntoView()
  }

  render() {
    return (
      <React.Fragment>
        <pre className="form-state">
          {JSON.stringify(this.state)}
        </pre>
        <form onSubmit={this.handleSubmit} className="planet-form">
          <label
            className="planet-input-label"
            htmlFor='name'
          >
            Planet Name: 
            <input
              className="planet-input"
              type='text'
              id='name'
              placeholder='Enter a new planet name...'
              onChange={this.handleChange}
              value={this.state.planetName}
            />
            </label>
          <input
            className="planet-button"
            type='submit'
            value='add Planet'
            ref={this.boxRef}
          />
        </form>
      </React.Fragment>
    )
  }
}

PlanetForm.propTypes = {
  addPlanet: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  planet: state.planet
})

export default connect(
  mapStateToProps,
  { addPlanet }
)(PlanetForm)
