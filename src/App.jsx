  // App.js
  import React from 'react';
  import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import Navbar from './components/Navbar.jsx';
  import Register from './pages/Register.jsx';
  import Login from './pages/Login.jsx';
  import Dashboard from './pages/Dashboard.jsx';
  import AdminPanel from './pages/AdminPanel.jsx';

  import './App.css';

  function App() {
    return (
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router>
    );
  }

  export default App;