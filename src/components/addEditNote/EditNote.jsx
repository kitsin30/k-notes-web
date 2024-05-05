import React from 'react'
import Navbar from '../navbar/Navbar'
import NotesForm from '../notes/NotesForm'
import { useLocation } from 'react-router-dom';

const EditNote = () => {

  const location = useLocation();

  const props = location.state;

  return (
    <div>
      <Navbar />
      <NotesForm props={props} />
    </div>
  )
}

export default EditNote;
