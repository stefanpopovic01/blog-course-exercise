import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
 
  const handleLogout = () => {

    localStorage.removeItem("accessToken"); 
    localStorage.removeItem("user");
    navigate("/login");

  };

  return (
    <header className="header">
      <div className="header-container">

        <div className="logo">MyBlog</div>

        <nav className="nav-links" >
          <span onClick={() => navigate("/")} >Home</span>
          <span>About</span>
          <span>Contact</span>
        </nav>
        
        <div className="auth-buttons">
          <button className="login-btn" onClick={() => navigate(token ? "/profile" : "/login") }>{token ? "Profile" : "Login"}</button>
          <button className="register-btn" onClick={() => { token ? handleLogout() : navigate("/register")}}>{token ? "Logout" : "Register"}</button>
        </div>
      </div>
    </header>
  );
};


export default Header;
