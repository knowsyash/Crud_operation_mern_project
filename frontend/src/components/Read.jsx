import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Read({ darkMode }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  async function getData() {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000');
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Something went wrong');
      } else {
        setData(result);
        setError('');
      }
    } catch (err) {
      console.log(err.message);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user? 🗑️')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Delete failed');
        return;
      }

      setData((prevData) => prevData.filter((item) => item._id !== id));
      
      // Show success message
      const successDiv = document.createElement('div');
      successDiv.className = 'alert alert-success position-fixed top-0 end-0 m-3';
      successDiv.style.zIndex = '9999';
      successDiv.innerHTML = '✅ User deleted successfully!';
      document.body.appendChild(successDiv);
      setTimeout(() => successDiv.remove(), 3000);
    } catch (err) {
      console.log(err.message);
      setError('Failed to delete item');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const filteredData = data.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.position && user.position.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const LoadingSkeleton = () => (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100">
        <div className="card-body">
          <div className="skeleton" style={{ height: '30px', marginBottom: '10px' }}></div>
          <div className="skeleton" style={{ height: '20px', marginBottom: '10px' }}></div>
          <div className="skeleton" style={{ height: '20px', width: '60%' }}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h3 className="mb-2">Employees</h3>
        <p className="text-muted">{filteredData.length} total</p>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by name, email, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError('')}></button>
        </div>
      )}

      {/* Users Grid */}
      <div className="row">
        {loading ? (
          <>
            {[1, 2, 3, 4, 5, 6].map((i) => <LoadingSkeleton key={i} />)}
          </>
        ) : filteredData.length === 0 ? (
          <div className="col-12 text-center py-5">
            <h4 style={{ color: '#ffffff' }}>No employees found</h4>
            <p style={{ color: 'rgba(203, 213, 225, 0.9)' }}>Try adjusting your search or add a new employee</p>
            <Link to="/create" className="btn btn-primary mt-3">
              Add Employee
            </Link>
          </div>
        ) : (
          filteredData.map((ele) => (
            <div key={ele._id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '6px',
                      background: '#2563eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      marginRight: '12px',
                      color: '#fff'
                    }}>
                      {ele.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h6 className="mb-0">{ele.name}</h6>
                      <small className="text-muted">{ele.position || 'Employee'}</small>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <small className="text-muted">{ele.email}</small>
                  </div>
                  
                  <div className="mb-3">
                    <span className="badge" style={{
                      background: '#1e293b',
                      color: '#94a3b8',
                      border: '1px solid #334155'
                    }}>
                      {ele.department || 'General'}
                    </span>
                    <span className="ms-2 text-muted" style={{ fontSize: '0.85rem' }}>
                      Age {ele.age}
                    </span>
                  </div>
                  
                  <div className="d-flex gap-2">
                    <Link
                      to={`/${ele._id}`}
                      className="btn btn-sm btn-primary flex-grow-1"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-sm btn-danger flex-grow-1"
                      onClick={() => handleDelete(ele._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
