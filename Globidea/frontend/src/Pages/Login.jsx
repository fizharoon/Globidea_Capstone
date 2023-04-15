import React, { useState } from "react";
import './Login.css'

const login_api = async (username, password, success, fail) => {
  const response = await fetch(
    'http://127.0.0.1:8000/api/login',
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


export const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const success = async (text)=> {
    console.log("Yeah! Authenticated!");
    await localStorage.setItem("salesToken", text.access);
    window.location = "/";
  };

  const tryLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with", username, password);
    await login_api(username, password, success, (text) => {
      console.log(text);
    });
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={tryLogin}>
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
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};
