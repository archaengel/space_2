import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deletePlanet } from '../actions/planetActions'
import PropTypes from 'prop-types'

class PlanetListItem extends Component {
  constructor(props) {
    super(props)

    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  onDeleteClick(id) {
    this.props.deletePlanet(id)
  }

  render() {
    return (
      <li className="planet-list-item" key={this.props._id}>
        {this.props.name}
        <button onClick={this.onDeleteClick.bind(this, this.props._id)}>
          &times;
        </button>
      </li>
    )
  }
}

PlanetListItem.propTypes = {
  deletePlanet: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  planet: state.planet
})

export default connect(mapStateToProps, { deletePlanet })(PlanetListItem)
