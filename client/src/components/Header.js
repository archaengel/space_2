import React from 'react'

import Navigation from './Navigation'
import AuthButton from './AuthButton'

const Header = () => {
  return (
    <>
      <AuthButton />
      <header> 
        <i className="logo">LOGO</i>
        <Navigation />
      </header>
    </>
  )
}

export default Header
