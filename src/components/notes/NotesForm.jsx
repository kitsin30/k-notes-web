import React, { useState } from 'react'

const NotesForm = (props) => {

  const {note, setNote} = useState('');
  var userNotes = "";
  if(props){
    userNotes = props.userNotes;
  }

  return (
    <div className='notes-popup'>
      <h2>{props.title}</h2>
      <textarea placeholder='write your note' id="note" value={note} onChange={(e) => setNote(e.target.value)} rows="4" cols="50">{userNotes}</textarea>
      <div className="button-validate-ok-cancel">
        <button >Ok</button>
        <button >Cancel</button>
      </div>
    </div>
  )
}

export default NotesForm
