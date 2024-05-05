import React from 'react'
import './NotesCard.css'
import { useNavigate } from 'react-router-dom';
const NotesCard = ( { note, ctr } ) => {

  const navigate = useNavigate();
  
  const moveToCard = (note) => {
    const flag = true;
    localStorage.setItem('detailCardPage', JSON.stringify({ flag }));
    navigate("/detail", {
      state: note
    });
  }

  return (
    <div className="note-card" onClick={() => moveToCard(note)}>
      <div className="circle">
        <h2>{ctr}</h2>
      </div>
      <div className="content">
        <p>{note.userNotes}</p>
      </div>
    </div>
  )
}

export default NotesCard
