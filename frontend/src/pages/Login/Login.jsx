import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { AuthContext } from "../../contex/AuthContex";
import { useContext } from "react";

import { login } from "../../api/services/authService";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await login({ email, password });

      console.log("Ulogovan:");
      setError("");
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate("/");

    } catch (err) {
      setError(
        err.response?.data?.message || "Greska prilikom logovanja."
      )
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <label>Email</label>
        <input type="email" placeholder="Unesi email" required value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="password" placeholder="Unesi lozinku" required value={password} onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit">Submit</button>

        <p className="register-link">
          Niste registrovani? <span onClick={() => navigate("/register")}>Register</span>
        </p>
        {error && <p className="error-msg">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
