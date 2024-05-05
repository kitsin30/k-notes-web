import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import NotesCard from '../notes/NotesCard';
import ReactPaginate from 'react-paginate';
import { useLocation } from 'react-router-dom';
import '../home/Home.css';

const SearchPage = () => {
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

  const location = useLocation();

  const userId = localStorage.getItem("userId");
  const userNotes = location.state;

  try {
    useEffect(() => {
      const fetchNotes = async () => {
        const response = await fetch('http://localhost:8080/notes/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, userNotes })
        });
        const data = await response.json();
        setNotes(data.obj);

        if(data.status !== 200){
          console.log("false");
          alert(data.msg);
        }

      };
  
      fetchNotes();

    }, [userId, userNotes]);

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
          pageCount={Math.ceil(totalNotes / 10)}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className='pagination-menu'
        />
      </div>

    </div>
  )
}

export default SearchPage;
