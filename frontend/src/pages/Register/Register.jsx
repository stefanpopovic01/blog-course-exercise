import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Register.css";
import axios from "axios";

import { register } from "../../api/services/authService";

const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); 

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await register({ username, email, password });

      setSuccess(true);
      setError("");

    } catch (err) {
      setError("Doslo je do greske.");
      setSuccess(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Register</h2>

        <label>Username</label>
        <input type="text" placeholder="Unesi korisničko ime" required value={username} onChange={(e) => setUsername(e.target.value)}/>

        <label>Email</label>
        <input type="email" placeholder="Unesi email" required value={email} onChange={(e) => setEmail(e.target.value)}/>

        <label>Password</label>
        <input type="password" placeholder="Unesi lozinku" required value={password} onChange={(e) => setPassword(e.target.value)}/>

        <button type="submit">Submit</button>

        <p className="login-link">
          Već imate nalog? <span onClick={() => navigate("/login")}>Login</span>
        </p>

        {success && <p className="success-msg">Uspešno ste se registrovali!</p>}
        {error && <p className="error-msg">{error}</p>}

      </form>
    </div>
  );
};

export default Register;
