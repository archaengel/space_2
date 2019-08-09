import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPlanets, addPlanet } from '../actions/planetActions'
import PropTypes from 'prop-types'
import PlanetListItem from './PlanetListItem'

class PlanetList extends Component {
  constructor(props){
    super(props)
  }

  shouldComponentUpdate(nextProps) {
    const nextPlanets = nextProps.planet.planets
    const currPlanets = this.props.planet.planets
    return (nextPlanets.length !== currPlanets.length)
  }

  componentDidMount() {
    this.props.getPlanets()
  }

  render() {
    const { planets } = this.props.planet
    return (
      <ul className="planet-list" >
        <h2 className="planet-list-title">Planet List</h2>
        { planets.length === 0
          ? <p className='empty-list'>You don't have any planets yet. Try adding some...</p>
          : planets.map((p) => (
            <PlanetListItem key={p._id} {...p}/>
          )) 
        }
      </ul>
    )
  }
}

PlanetList.propTypes = {
  getPlanets: PropTypes.func.isRequired,
  addPlanet: PropTypes.func.isRequired,
  planet: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  planet: state.planet,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getPlanets, addPlanet }
)(PlanetList)
