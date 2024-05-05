import React, { useState } from 'react';
import './NotesForm.css'
import { useNavigate } from 'react-router-dom';

const NotesForm = (props) => {

  props = props.props;

  const [noteText, setNoteText] = useState(props.note ? props.note.userNotes : '');
  const navigate = useNavigate();

  // if(props.note){
  //   setNoteText(props.note.userNotes);
  // }

  window.onpopstate = () => {
    localStorage.removeItem('addPage');
    localStorage.removeItem('editPage');
  }

  const goBackToPrevPage = () => {
    navigate(-1);
    localStorage.removeItem('addPage');
    localStorage.removeItem('editPage');
  }

  const handleCreateNote = async (e) => {
    e.preventDefault();

    const userNotes = noteText;

    console.log(userNotes);

    try {
      let response;
      
      if(!props.note){
        console.log(userNotes);
        const userId = localStorage.getItem('userId');
        response = await fetch('http://localhost:8080/notes/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, userNotes }),
        });
      } else{
        const id = props.note.id;
        response = await fetch('http://localhost:8080/notes/updatenote', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, userNotes }),
        });
      }

      const data = await response.json();
      console.log(data);

      if(data.status === 200){
        navigate('/home');
        alert(data.msg);
        localStorage.removeItem('addPage');
        localStorage.removeItem('editPage');
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

  return (
    <div className='notes-form'>
      <div className='notes-wrapper'>
        <form onSubmit={handleCreateNote}>
          <h1>{props.title}</h1>
          <div className='notes-input'>
            <textarea placeholder='write your note' id="note" value={noteText} onChange={(e) => setNoteText(e.target.value)} rows="6" cols="50" required />
          </div>
          <div className="button-validate-ok-cancel">
            <button type='submit' >Ok</button>
            <button type='button' onClick={goBackToPrevPage} >Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NotesForm
