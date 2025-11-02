import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" 
         style={{ 
           background: '#1e293b',
           borderBottom: '1px solid #334155'
         }}>
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/" style={{ color: '#3b82f6' }}>
          EmployeeHub
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto ms-3">
            <li className="nav-item">
              <Link className="nav-link" to="/all" style={{ color: '#e2e8f0' }}>
                Directory
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create" style={{ color: '#e2e8f0' }}>
                Add Employee
              </Link>
            </li>
          </ul>
          
          <button 
            className="btn btn-sm btn-secondary"
            onClick={toggleDarkMode}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
