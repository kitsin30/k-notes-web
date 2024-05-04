import React from 'react';
import './Navbar.css';
const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='title-home'>
        <h3>k-notes</h3>
        <a href="/home" ><h3>Home</h3></a>
      </div>
      
      <a href="/logout"><h3>Logout</h3></a>
    </div>
  )
}

export default Navbar;
