import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import NotesCard from '../notes/NotesCard';
import './Home.css';
import Navbar from '../navbar/Navbar';
import { FaPlus } from 'react-icons/fa';

const Home = () => {
  const [notes, setNotes] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  var totalNotes = 0;
  var noteCtr = 0;
  var notesListShow = null;
  if(notes !== null){
    totalNotes = notes.length;
    notesListShow = notes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    noteCtr = noteCtr*(currentPage-1) + 1;
  }

  const userId = localStorage.getItem("userId");

  try {
    useEffect(() => {
      const fetchNotes = async () => {
        const response = await fetch('http://localhost:8080/notes/list', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        });
        const data = await response.json();
        setNotes(data.obj);

        if(data.status !== 200){
          console.log("false");
          alert(data.msg);
        }

      };
  
      fetchNotes();

    }, [userId]);

  } catch (error) {
    console.error(error);
    alert(error);
  }

  const handlePageChange = (data) => {
    setCurrentPage(data.selected + 1);
  }

  return (
    <div className='home-page'>
      <Navbar />

      <div className='note-list'>
        {notesListShow && notesListShow.map((note) => (
          <NotesCard key={note.id} note={note} ctr={noteCtr++} />
        ))}
      </div>

      <div className='pagination-div'>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageChange}
          pageRangeDisplayed={totalNotes}
          pageCount={(totalNotes / 10)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className='pagination-menu'
        />
      </div>

      <div className='fab' >
        <FaPlus className='fab-ic'/>
      </div>

    </div>
  )
}

export default Home
