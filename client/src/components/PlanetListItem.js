import React, {Component} from 'react'
import {connect} from 'react-redux'
import {deletePlanet} from '../actions/planetActions'
import PropTypes from 'prop-types'

class PlanetListItem extends Component {
  constructor(props) {
    super (props)

    this.onDeleteClick = this.onDeleteClick.bind (this)
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps._id !== this.props._id)
  }

  onDeleteClick(id) {
    this.props.deletePlanet (id)
  }

  render() {
    const {name, _id} = this.props
    return (
      <li className="planet-list-item" >
        {name}
        <button
          className="delete-button"
          onClick={this.onDeleteClick.bind (this, _id)}
        >
          &times;
        </button>
      </li>
    )
  }
}

PlanetListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  deletePlanet: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  planet: state.planet,
})

export default connect (mapStateToProps, {deletePlanet}) (PlanetListItem)
