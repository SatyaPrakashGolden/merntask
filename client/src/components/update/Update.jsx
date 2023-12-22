import React, { useState, useEffect } from 'react';
import { makeRequest } from "../../axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Update = () => {
  const notifydata = {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    }
  const successNotify = () => toast.success("Note updated Successfully!", notifydata);
  const errNotify = () => toast.error("Note not updated!", notifydata);
  
  const [singlePost, setSinglePost] = useState({});
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [jwttoken, setJwttoken] = useState(''); 
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameParts = location.pathname.split('/');
  const postId = pathnameParts[pathnameParts.length - 1];

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const response = await makeRequest.get(`note/find/${postId}`);
        setSinglePost(response.data);
        setNewTitle(response.data.title);
        setNewDesc(response.data.desc);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchSinglePost();
  }, [postId]);

  useEffect(() => {
    setJwttoken(localStorage.getItem('jwttoken')); 
  }, []);

  const handleUpdate = async () => {
    try {
      const updatedPost = {
        title: newTitle,
        desc: newDesc,
      };

      console.log('Your token:', jwttoken);

      const response = await makeRequest.put(`note/update/${postId}`, updatedPost, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwttoken}`,
        },
      });

      if (response.status === 200) {
        successNotify();
        setTimeout(() => {
          navigate("/mynotes");
       }, 2000);
      }

      console.log('Post updated:', response.data);
    } catch (error) {
      console.error('Error updating post:', error);
      // Add user-friendly error handling here if needed
    }
  };

  return (
    <div className="container mt-5">
      <div style={{ marginTop: '70px' }}></div>
      <h2 className="mb-4">Update Post</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title:</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description:</label>
        <textarea
          className="form-control"
          id="description"
          rows="4"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdate}>Update Post</button>
      <ToastContainer />
    </div>
  );
};

export default Update;