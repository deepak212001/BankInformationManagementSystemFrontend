import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [admin, setAdmin] = useState();
  const [showAdmin, setShowAdmin] = useState();
  const [dash, setDash] = useState();
  const [logout, setLogout] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log("location.pathname", location.pathname);

  const handleLogout = async () => {
    try {
      await axios.post('/api/user/logout', {}, {
        withCredentials: true
      });
      alert("Successfully Logout")
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const userRes = await axios.get('/api/user/me',
          {
            withCredentials: true
          });
        if (userRes.data.role === "admin")
          setAdmin(true);
        else
          setAdmin(false)
      } catch (err) {
        console.log("error : ", err)
      }
    };
    fetchuser();
  }, [])

  useEffect(() => {
    setShowAdmin(location.pathname === "/dashboard");
    setDash(location.pathname === "/admin");
    setLogout(location.pathname !== "/login" && location.pathname !== "/register");
  }, [location.pathname]);


  return (
    <nav className="navbar">
      <div className="navbar-logo">Bank Info Manager</div>
      <ul className="navbar-links">
        <li>{dash && <Link to="/dashboard">Dashboard</Link>}</li>
        <li>{(admin && showAdmin) && <Link to="/admin">Admin Panel</Link>}</li>
        <li>{logout && <button onClick={handleLogout} className="logout-btn">Logout</button>}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
