import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
