import React from 'react';
import { Link } from 'react-router-dom';

export default function Home({ darkMode }) {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10 text-center">
          <h1 className="display-4 fw-bold mb-3" style={{ color: '#f1f5f9' }}>
            Employee Directory
          </h1>
          <p className="lead mb-5 text-muted">
            Manage your team efficiently
          </p>
          
          <div className="d-flex gap-3 justify-content-center mb-5 flex-wrap">
            <Link to="/all" className="btn btn-primary btn-lg">
              View Directory
            </Link>
            <Link to="/create" className="btn btn-success btn-lg">
              Add Employee
            </Link>
          </div>
          
          <div className="row g-4 mt-4">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center p-4">
                  <div className="mb-3" style={{ fontSize: '2.5rem' }}>👥</div>
                  <h5 className="card-title fw-bold mb-2" style={{ color: '#f1f5f9' }}>Add</h5>
                  <p className="text-muted mb-0">Register new team members</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center p-4">
                  <div className="mb-2" style={{ fontSize: '2rem' }}>📋</div>
                  <h6 className="mb-2">Manage</h6>
                  <small className="text-muted">View all employees</small>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center p-4">
                  <div className="mb-2" style={{ fontSize: '2rem' }}>✏️</div>
                  <h6 className="mb-2">Update</h6>
                  <small className="text-muted">Edit details</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
