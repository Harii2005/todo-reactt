import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   const handleShowform = async()=>{

  //     // Send a GET request when the "SignUp" button is clicked
  //     if(!showform){
  //       try{
  //         const response  = await fetch("http://localhost:8080/login",{
  //           method : "GET",
  //         });
  //         const data = await response.json();
  //         console.log("GET response : " , data);

  //       }catch(err){
  //         console.error("Error during GET request:", err);
  //       }
  //     }
  //   }

  //   const handleInputChange =(e) => {
  //     const {name , value} = e.target;
  //     setformData({...formData , [name] : value});
  //   };

  const handleSubmit = async () => {
    e.preventDefault();
    setError("");

    // Send a POST request when the form is submitted
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store the token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to Todo page
      navigate("/todo");
    } catch (err) {
      setError(err.message);
      console.log("err : ", err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="login-button">Login</button>
        </div>
      </form>
      
      <div className="register-link">
        <p>Don't have an account? <span onClick={() => navigate('/signup')}>Register</span></p>
      </div>
    </div>
  );
}
