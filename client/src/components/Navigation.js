import React from 'react'

import {NavLink} from 'react-router-dom'

const Navigation = props => (
    <nav>
      <NavLink className='nav-link' exact to='/' >Home</NavLink>
      <NavLink className='nav-link' to='/posts' >Diary</NavLink>
    </nav>
  )

export default Navigation
