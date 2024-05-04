import React from 'react';
import './Navbar.css';
const Navbar = () => {

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    console.log(localStorage.getItem("username"));
  }

  return (
    <div className='navbar'>
      <div className='title-home'>
        <h3>k-notes</h3>
        <a href="/home" ><h3>Home</h3></a>
      </div>
      
      <div>
        <a onClick={logout} href="/"><h3>Logout</h3></a>
      </div>
    </div>
  )
}

export default Navbar;
