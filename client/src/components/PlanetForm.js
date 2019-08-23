import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addPlanet} from '../actions/planetActions'
import PropTypes from 'prop-types'

class PlanetForm extends Component {
  constructor(props) {
    super (props)
    this.state = {
      planetName: '',
    }

    this.handleChange = this.handleChange.bind (this)
    this.handleSubmit = this.handleSubmit.bind (this)
  }

  handleChange(e) {
    this.setState ({planetName: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault ()
    const newPlanet = {
      name: this.state.planetName,
    }
    if (newPlanet) {
      console.log (newPlanet.name)
      this.props.addPlanet (newPlanet)
    }
    this.setState ({planetName: ''})
  }

  // Update if name is input or planet is added, but not deleted
  shouldComponentUpdate(nextProps, nextState) {
    const nextPlanets = nextProps.planet.planets
    const currPlanets = this.props.planet.planets
    const nextName = nextState.planetName
    const currName = this.state.planetName
    const isLonger = nextPlanets.length > currPlanets.length
    const isChanged = currName !== nextName
    return (isLonger || isChanged)
  }

  render() {
    return (
      <React.Fragment>
        <pre className="form-state">
          {JSON.stringify (this.state)}
        </pre>
        <form onSubmit={this.handleSubmit} className="planet-form">
          <label
            className="planet-input-label"
            htmlFor='name'
          >
            Planet Name:
          </label>
          <input
            className="planet-input"
            type='text'
            id='name'
            placeholder='Enter a new planet name...'
            onChange={this.handleChange}
            value={this.state.planetName}
          />
          <input
            className="planet-button"
            type='submit'
            value='add Planet'
          />
        </form>
      </React.Fragment>
    )
  }
}

PlanetForm.propTypes = {
  planet: PropTypes.object.isRequired,
  addPlanet: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  planet: state.planet,
})

export default connect (
  mapStateToProps,
  {addPlanet}
) (PlanetForm)
