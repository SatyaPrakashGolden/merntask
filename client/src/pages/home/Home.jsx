import React, { useState, useEffect } from 'react';
import { makeRequest } from "../../axios";
import { Link } from 'react-router-dom';

const Home = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await makeRequest.get("note/getAll");
        if (res.status === 200) {
          setNotes(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotes();
  }, []);

  const truncateDescription = (description, words = 47) => {
    const wordArray = description.split(" ");
    const truncatedWords = wordArray.slice(0, words);
    return truncatedWords.join(' ');
  };
  

  return (
    <div className="container mt-4">
      <div style={{ marginTop: '70px' }}></div>
      <h1 className="mb-4">All Notes</h1>
      {notes.length > 0 ? (
        notes.map((note) => (
          <Link key={note._id} to={`reads/${note._id}`} className="btn btn-outline-info" data-mdb-ripple-color="light">
            <div className="card m-4 mb-4 " style={{ height: '100%' }}>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{truncateDescription(note.desc, 47)}</p>
                {note.userId && (
                  <p className="card-text">
                    <small className="text-muted">Created by: {note.userId.username}</small>
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>No notes available.</p>
      )}
    </div>
  );
};

export default Home;
