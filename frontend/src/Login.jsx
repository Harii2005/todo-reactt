import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [formData , setformData] = useState({
    email : "",
    password : "",
  });

  const handleShowform = async()=>{

    // Send a GET request when the "SignUp" button is clicked
    if(!showform){
      try{
        const response  = await fetch("http://localhost:8080/login",{
          method : "GET",
        });
        const data = await response.json();
        console.log("GET response : " , data);

      }catch(err){
        console.error("Error during GET request:", err);
      }
    }
  }

  const handleInputChange =(e) => {
    const {name , value} = e.target;
    setformData({...formData , [name] : value});
  };

  const handleSubmit = async() => {
    e.preventDefault();

    // Send a POST request when the form is submitted
    try{
      const response = await fetch("http://localhost:8080/api/login", {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
      });
      const data = await response.json();
      
    }catch(err){
      console.log("err : " , err);
    }
  };


  return (
    <>
     <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
    </>
  );
}