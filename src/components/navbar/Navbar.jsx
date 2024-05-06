import React, { useState } from 'react';
import './Navbar.css';
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {

  const [searchNote, setSearchNote] = useState('');

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("addPage");
    localStorage.removeItem('editPage');
    localStorage.removeItem("detailCardPage");
  }

  const moveToHomePage = () => {
    localStorage.removeItem("addPage");
    localStorage.removeItem('editPage');
    localStorage.removeItem("detailCardPage");
  }

  const handleSearch = (e) => {
    e.preventDefault();

    console.log(searchNote);

    localStorage.removeItem("addPage");
    localStorage.removeItem('editPage');
    localStorage.removeItem("detailCardPage");

    navigate("/search", {
      state: searchNote
    })

    setSearchNote('');

  }

  return (
    <div className='navbar'>
      <div className='title-home'>
        <h3>k-notes</h3>
        <a href="/home" onClick={moveToHomePage}><h3>Home</h3></a>
      </div>
      
      <div className='search-logout'>
        <form className="input-search" onSubmit={handleSearch}>
          <input type="text" placeholder='Search' id='search' value={searchNote} onChange={(e) => setSearchNote(e.target.value)}/>
          <button type='submit'><CiSearch className='icon-search'/></button>
        </form>
        <a onClick={logout} href="/"><h3>Logout</h3></a>
      </div>
    </div>
  )
}

export default Navbar;
