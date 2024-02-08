// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignUpPage from "./components/auth/SignUp";
import LoginPage from "./components/auth/Login";
import CreateRoomPage from "./components/room/CreateRoom";
import StreamingPage from "./components/StreamingPage";
import HomePage from "./components/main/HomePage";
import { useAuth } from "./components/auth/AuthContext";

function App() {
  const { currentUser, logout } = useAuth();

  return (
    <Router>
      <div>
        <nav>
          {!currentUser ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">SignUp</Link>
            </>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/create-room" element={<CreateRoomPage />} />
          <Route path="/stream/:id" element={<StreamingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
