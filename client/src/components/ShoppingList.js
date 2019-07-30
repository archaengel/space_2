import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPlanets, addPlanet, deletePlanet } from '../actions/planetActions'
import PropTypes from 'prop-types'

class ShoppingList extends Component {
  constructor(props){
    super(props)
    this.state = {
      planetName: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
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
    console.log(this.boxRef.current.scrollIntoView)
    this.boxRef.current.scrollIntoView({
      block: 'center'
    })
  }

  onDeleteClick(id) {
    this.props.deletePlanet(id)
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
          { planets.map((p) => (
            <li key={p._id}>
              {`${p.name} id: ${p._id}`}
              <button onClick={this.onDeleteClick.bind(this, p._id)}>
                &times;
              </button>
            </li>
            )) 
          }
        </ol>
        <form onSubmit={this.handleSubmit} >
          <label htmlFor='name' >Planet Name:</label>
          <input type='text' id='name' onChange={this.handleChange} value={this.state.planetName}/>
          <input type='submit' value='add Planet' ref={this.boxRef} />
        </form>
      </React.Fragment>
    )
  }
}

ShoppingList.propTypes = {
  getPlanets: PropTypes.func.isRequired,
  addPlanet: PropTypes.func.isRequired,
  deletePlanet: PropTypes.func.isRequired,
  planet: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  planet: state.planet
})

export default connect(
  mapStateToProps,
  { getPlanets, addPlanet, deletePlanet }
)(ShoppingList)
