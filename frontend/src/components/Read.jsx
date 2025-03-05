import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function Read() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  async function getData() {
    try {
      const response = await fetch('http://localhost:5000');
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Something went wrong');
        return; // Stop execution if there's an error
      }

      setData(result);
    } catch (err) {
      console.log(err.message);
      setError('Failed to fetch data');
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Delete failed');
        return;
      }

      // Remove deleted item from state
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err.message);
      setError('Failed to delete item');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(data);

  return (
    <div className="container my-2">
      <div className="text-center">Read</div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-3">
            <div className="card" style={{ width: '18rem' }}>
              <div className="card-body">
                <h5 className="card-title">{ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                <p className="card-text">{ele.age}</p>
                <Link to={`/${ele._id}`} className="card-link">Edit</Link>
                <a href="#" className="card-link" onClick={() => handleDelete(ele._id)}>
                  Delete
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
