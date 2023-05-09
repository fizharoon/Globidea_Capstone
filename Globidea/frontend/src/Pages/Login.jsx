import React, { useState } from "react";
import './Login.css';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const login_api = async (username, password, success, fail) => {
  const response = await fetch(
    'http://127.0.0.1:8000/api/admin',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
      })
    }
  );
  const text = await response.text();
  if (response.status === 200) {
    console.log("success", JSON.parse(text));
    success(JSON.parse(text));
  } else {
    console.log("failed", text);
    Object.entries(JSON.parse(text)).forEach(([key, value])=>{
      fail(`${key}: ${value}`);
    });
  }
};


export const Login = () => {
  //const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const success = async (text)=> {
    console.log("Yeah! Authenticated!");
    await localStorage.setItem("salesToken", text.access);
    window.location = "/";
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'globidea') {
      console.log("Login successful!");
      alert("Login successful!"); 
      setTimeout(() => { 
        window.location.href = "/curatorpage";
      }, 2000);
      
      
     
      window.location.href = "/curatorpage";
      // props.history.push('/curatorpage');
    } else {
      
      console.log("Invalid username or password");
      alert("Invalid username or password");
    }
  }
    const handleGoBack = () => {
      window.history.back();
    };

    return (
      <div className="auth-form-container">
      <h3>Admin Login</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder=""
          id="username"
          name="username"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder=""
          id="password"
          name="password"
        />
         <button className="goBack" type="submit">Log In</button>
      </form>
            <button className="goBack"onClick={handleGoBack}>Go Back</button>

        </div>
    )
}
export default Login;