import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";


const Header = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
 

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
          <button className="login-btn" onClick={() => navigate("/login")}>{token ? "Profile" : "Login"}</button> {/* token ? Samo radi UI-a, inace bi bilo samo "login", ovo je kako bi izgledao header u buducnosti kad se korisnik loguje, bice promenjeno :) */}
          <button className="register-btn" onClick={() => navigate("/register")}>{token ? "Logout" : "Register"}</button> {/* Samo radi UI-a, kako bi izgledao Logout button u buducnosti kad se korisnik loguje*/}
        </div>
      </div>
    </header>
  );
};


export default Header;
