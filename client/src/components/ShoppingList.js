import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPlanets } from '../actions/planetActions'
import PropTypes from 'prop-types'

class ShoppingList extends Component {

  componentDidMount() {
    this.props.getPlanets()
  }

  render() {
    const { planets } = this.props.planet
    return (
      <ol>
        { planets.map((p)=> <li>{p}</li>) }
      </ol>
    )
  }
}

ShoppingList.propTypes = {
  getPlanets: PropTypes.func.isRequired,
  planet: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  planet: state.planet
})

export default connect(
  mapStateToProps,
  { getPlanets }
)(ShoppingList)
