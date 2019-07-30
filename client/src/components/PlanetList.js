import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPlanets, addPlanet } from '../actions/planetActions'
import PropTypes from 'prop-types'
import PlanetListItem from './PlanetListItem'

class PlanetList extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    this.props.getPlanets()
  }

  render() {
    const { planets } = this.props.planet
    return (
      <ul>
        { planets.map((p) => (
            <PlanetListItem {...p}/>
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
  planet: state.planet
})

export default connect(
  mapStateToProps,
  { getPlanets, addPlanet }
)(PlanetList)
