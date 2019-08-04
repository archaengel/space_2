import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav>
      <a className="nav-link" href="#" >NASA</a>
      <a className="nav-link" href="#" >About</a>
      <a className="nav-link" href="#" >Contact</a>
      <NavLink className="nav-link" to='/login'>Login</NavLink>
    </nav>
  )
}

export default Navigation
