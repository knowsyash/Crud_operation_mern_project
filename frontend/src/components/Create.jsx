import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Create() {
     //data tracking   
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error,setError]=useState("");
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log({ name, email, age }); // For debugging
    // alert(`Name: ${name}\nEmail: ${email}\nAge: ${age}`);
    const addUser ={name,email,age}
    const response = await fetch('http://localhost:5000/',{
      method :"POST",
      body:JSON.stringify(addUser),
      headers:{
        "Content-Type":"application/json", 
      },
    });
    const result  = await response.json();
    if(!response.ok)
    {console.log(result.error)
      setError(result.error);
    }
    if(response.ok)
      {console.log(result )
        setError("");
        setName("");
        setAge(0);
        setEmail("");
        navigate("/all")
      }
  };

  return (
    
    <div className="container mt-4 p-4 border rounded shadow-sm">
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      {/* short circuit rendering */}

      <h2 className="mb-4">Create Form</h2>  
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
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

        {/* Email Input */}
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

        {/* Age Input */}
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

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
}
