import React, { Component } from 'react'

class ShoppingList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      planets: [
        "venus",
        "mercury"
      ]
    }
  }

  render() {
    return (
      <ol>
        { this.state.planets.map((p)=> <li>{p}</li>) }
      </ol>
    )
  }
}

export default ShoppingList
