
import React, { useState, useEffect, useContext } from 'react';
import { makeRequest } from "../../axios";
import { AuthContext } from "../../../src/context/authContext";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mynotes = () => {

    let { currentUser } = useContext(AuthContext);
    const userId = currentUser.user._id;
    const [notes, setNotes] = useState([]);
    const notifydata = {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        }
    const successNotify = () => toast.success("Note Deleted Successfully!", notifydata);
    const errNotify = () => toast.error("Note not updated!", notifydata);
    const myAllNotes = async () => {
        try {
            const res = await makeRequest.get(`note/getAll/${userId}`);
            setNotes(res.data);
            console.log(res.data)
            const authToken = localStorage.getItem('token');
            console.log(authToken)
        } catch (err) {
            console.log(err);
        }
    };
    const handleDelete = async (noteId) => {
        try {
            const authToken = localStorage.getItem('jwttoken');
            const res = await makeRequest.delete(`note/delete/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (res.status === 200) {
                successNotify();
                myAllNotes();
            }
        } catch (error) {
            errNotify()
        }
    };

    useEffect(() => {
        myAllNotes();
    }, []);

    return (
        <div className="container mt-4">
            <div style={{ marginTop: '70px' }}></div>
            <h1 className="mb-4">My Notes</h1>
            {notes.length > 0 ? (
                notes.map(note => (
                    <div key={note._id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{note.title}</h5>
                            <p className="card-text">{note.desc}</p>
                            <p className="card-text">
                                <small className="text-muted">Created at: {new Date(note.createdAt).toLocaleString()}</small>
                            </p>
                            <div className="d-flex justify-content-end">
                                <Link to={`/update/${note._id}`} className="btn btn-primary me-2">Update</Link>
                                <button className="btn btn-danger" onClick={() => handleDelete(note._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No notes available.</p>
            )}
            <ToastContainer/>
        </div>
    );
};

export default Mynotes;