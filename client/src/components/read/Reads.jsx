
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeRequest } from "../../axios";

const Reads = () => {
  const [read, setRead] = useState({});
  const location = useLocation();
  const pathnameParts = location.pathname.split('/');
  const postId = pathnameParts[pathnameParts.length - 1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeRequest.get(`note/find/${postId}`);
        setRead(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchData();
  }, [postId]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            {read.imageUrl && (
              <img
                className="card-img-top"
                src={read.imageUrl}
                alt="Post Image"
              />
            )}

            <div className="card-body">
              <h1 className="card-title">{read.title}</h1>
              <p className="card-text">{read.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reads;
