import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Update() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getSingleUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${id}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Something went wrong");
        }

        setName(result.name);
        setEmail(result.email);
        setAge(result.age);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      }
    };

    getSingleUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();  // ✅ Fix: Properly receive the event
    console.log({ name, email, age });

    const updatedUser = { name, email, age };
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json().catch(() => null);
      if (!result || !response.ok) {
        setError(result?.error || "Something went wrong");
        return;
      }

      console.log(result);
      setError("");
      navigate("/all");
    } catch (error) {
      console.error("Update failed:", error);
      setError("Failed to update user");
    }
  };

  return (
    <div className="container mt-4 p-4 border rounded shadow-sm">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="mb-4">Edit Form</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            className="form-control"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value) || 0)}
            placeholder="Enter your age"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
}
