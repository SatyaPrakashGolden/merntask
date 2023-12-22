import React, { useState, useContext } from 'react';
import { makeRequest } from "../../axios";
import { AuthContext } from "../../../src/context/authContext";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleWrite = async () => {
    const notifydata = {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      }
  const successNotify = () => toast.success("Saved Notes Successfully!", notifydata);
  const errNotify = () => toast.error("Note not saved!", notifydata);
    try {
      const newNote = {
        userId: currentUser.user._id,
        title,
        desc,
      };

      const response = await makeRequest.post('note/post', newNote, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          'Content-Type': 'application/json', 
        },
      });

      if (response.status === 201) {
        successNotify();
        console.log('Note created:', response.data);
        navigate('/mynotes');
      } else {
        console.error('Error creating note:', response.data);
        // Handle error, show a message, or redirect to an error page
      }
    } catch (error) {
      console.error('Error creating note:', error);
      // Handle error, show a message, or redirect to an error page
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Write a New Note</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title:</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <textarea
          className="form-control"
          id="description"
          rows="4"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleWrite}>Save Note</button>
      <Link to="/mynotes" className="btn btn-secondary ms-2">Cancel</Link>
      <ToastContainer/>
    </div>
  );
};

export default Write;