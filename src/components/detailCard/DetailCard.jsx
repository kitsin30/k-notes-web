import React from 'react'
import Navbar from '../navbar/Navbar'
import './DetailCard.css'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaRegTrashAlt } from 'react-icons/fa';
import { CiEdit } from 'react-icons/ci';

const DetailCard = () => {

  const location = useLocation();
  const note = location.state;
  const navigate = useNavigate();

  window.onpopstate = () => {
    localStorage.removeItem('detailCardPage');
  }

  const deleteNotes = async (id) => {
    try {
      const response = await fetch('http://localhost:8080/notes/deletenote', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      // console.log(data);

      if(data.status === 200){
        navigate("/home");
        alert(data.msg);
        localStorage.removeItem('detailCardPage');
        console.log("true");
        
      } else{
        console.log("false");
        alert(data.msg);
      }

    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const editNotes = () => {
    const title = 'Edit Note';
    const flag = true;
    localStorage.setItem('editPage', JSON.stringify({ flag }));
    navigate("/home/detail/editnote", {
      state: { title, note }
    });
  }

  return (
    <div className='detail-card'>
      <Navbar />
      <div className='detail-content'>
        <div className='content-text'>{note.userNotes}</div>

        <div className='button-help'>

          <div className='delete-button' onClick={() => deleteNotes(note.id)}>
            <FaRegTrashAlt className='delete-ic'/>
            <p>Delete</p>
          </div>

          <div className="edit-button" onClick={editNotes}>
            <CiEdit className='edit-ic'/>
            <p>Edit</p>
          </div>
      </div>

      </div>
    </div>
  )
}

export default DetailCard
