import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPlanets, addPlanet } from '../actions/planetActions'
import PropTypes from 'prop-types'

class ShoppingList extends Component {
  constructor(props){
    super(props)
    this.state = {
      planetName: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    this.props.getPlanets()
  }

  componentDidMount() {
    this.props.getPlanets()
  }

  render() {
    const { planets } = this.props.planet
    return (
      <React.Fragment>
        <pre>
          {JSON.stringify(this.state)}
        </pre>
        <ol>
          { planets.map((p)=> <li>{p.name}</li>) }
        </ol>
        <form onSubmit={this.handleSubmit} >
          <label htmlFor='name' >Planet Name:</label>
          <input type='text' id='name' onChange={this.handleChange} value={this.state.planetName}/>
          <input type='submit' value='add Planet' />
        </form>
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
