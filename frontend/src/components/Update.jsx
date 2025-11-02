import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Update({ darkMode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getSingleUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Something went wrong");
        }

        setName(result.name);
        setEmail(result.email);
        setAge(result.age.toString());
        setDepartment(result.department || "");
        setPosition(result.position || "");
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getSingleUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const updatedUser = { 
      name, 
      email, 
      age: parseInt(age) || 0,
      department,
      position
    };
    
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json().catch(() => null);
      
      if (!result || !response.ok) {
        setError(result?.error || "Something went wrong");
        setSaving(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        navigate("/all");
      }, 1000);
    } catch (error) {
      console.error("Update failed:", error);
      setError("Failed to update user");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card">
              <div className="card-body">
                <p>Loading...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-body p-4">
              <h3 className="mb-1">Edit Employee</h3>
              <p className="text-muted mb-4">Update employee information</p>
              
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button type="button" className="btn-close" onClick={() => setError("")}></button>
                </div>
              )}

              {success && (
                <div className="alert alert-success" role="alert">
                  User updated successfully!
                </div>
              )}

              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label" style={{ color: '#ffffff' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{ color: '#ffffff' }}>
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="age" className="form-label" style={{ color: '#ffffff' }}>
                      Age
                    </label>
                    <input
                      type="number"
                      id="age"
                      className="form-control"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="30"
                      min="18"
                      max="80"
                      required
                    />
                  </div>
                  <div className="col-md-8 mb-3">
                    <label htmlFor="position" className="form-label" style={{ color: '#ffffff' }}>
                      Position
                    </label>
                    <input
                      type="text"
                      id="position"
                      className="form-control"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      placeholder="Software Engineer"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="department" className="form-label" style={{ color: '#ffffff' }}>
                    Department
                  </label>
                  <select
                    id="department"
                    className="form-control"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">Human Resources</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Design">Design</option>
                  </select>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate("/all")}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary flex-grow-1"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
