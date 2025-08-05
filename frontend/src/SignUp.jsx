import React from "react";
import { useState } from "react";
export default function signUp() {
  const [formData , setformData] = useState({
    username : "",
    email : "",
    password : "",
  });

  const handleShowform = async()=>{

    // Send a GET request when the "SignUp" button is clicked
    if(!showform){
      try{
        const response  = await fetch("http://localhost:8080/api/signup",{
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
      const response = await fetch("http://localhost:8080/api/signup", {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("POST Response:", data); 
    }catch(err){
      console.log("err : " , err);
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
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
        <div>
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
