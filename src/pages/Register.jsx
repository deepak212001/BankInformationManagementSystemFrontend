import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    "name": "",
    "email": "",
    "password": "",
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://bankinformationmanagementsystembackend.onrender.com/api/user/register', formData, {
        withCredentials: true
      });
      setMessage("Registered successfully! Please login.");
      setFormData({ "name": "", "email": "", "password": "" });
      alert("Registered Successfully")
      navigate("/dashboard");
    } catch (err) {
      // console.log(err.response?.data?.message )
      setMessage(err.response?.data?.message || "Registration failed");
    }
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const userRes = await axios.get('https://bankinformationmanagementsystembackend.onrender.com/api/user/me',
          {
            withCredentials: true
          });
        if (userRes)
          navigate("/dashboard");
      } catch (err) {
        console.log("error : ", err)
      }
    };
    fetchuser();
  }, [])

  return (
    <>
      <div className="register-container">
        <form onSubmit={handleRegister} className="register-form">
          <h2>Create an Account</h2>
          {message && <p className="message">{message}</p>}
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
          <Link to="/login"><button type="submit">Back To Login</button></Link>
        </form>
      </div>
    </>
  );
};

export default Register;
