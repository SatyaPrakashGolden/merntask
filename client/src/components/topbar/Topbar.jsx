import React, { useContext } from 'react'
import './topbar.css'
import noteImage from './note.png';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
const Topbar= () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top bg-light navbar-light">
        <div className="container">
          <a className="navbar-brand" >
            <Link to="/">
              <img
                id="MDB-logo"
                src={noteImage}
                draggable="false"
                height={40}
                alt="Note Image"
              />
            </Link>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >nav
            <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link to="/mynotes" style={{ textDecoration: 'none' }}>
                  <a className="nav-link mx-2" >
                    <i className="fas fa-plus-circle pe-2" />
                    My notes
                  </a>
                </Link>
              </li>
              <Link to="/write" style={{ textDecoration: 'none' }}>
                <li className="nav-item">
                  <a className="nav-link mx-2" >
                    <i className="fas fa-bell pe-2" />
                    Write
                  </a>
                </li>
              </Link>
              <li className="nav-item ms-3">
                <a className="btn btn-black btn-rounded"
                  onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Topbar