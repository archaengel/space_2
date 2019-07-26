import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPlanets, addPlanet } from '../actions/planetActions'
import PropTypes from 'prop-types'

class ShoppingList extends Component {

  componentDidMount() {
    this.props.getPlanets()
  }

  render() {
    const { planets } = this.props.planet
    return (
      <React.Fragment>
        <ol>
          { planets.map((p)=> <li>{p}</li>) }
        </ol>
        <button
          onClick={
            (e) => {
              e.preventDefault()
              const name = prompt("Enter Planet")
              if (name) {
                this.props.addPlanet(name)
              }
            }
          }
        >Add Planet</button>
      </React.Fragment>
    )
  }
}

ShoppingList.propTypes = {
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
)(ShoppingList)
