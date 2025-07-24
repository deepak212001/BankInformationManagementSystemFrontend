import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ "email": "", "password": "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const url = 'https://bankinformationmanagementsystembackend.onrender.com'
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/user/login`, formData, {
        withCredentials: true
      });
      setMessage("Login successful!");
      // console.log(res.data);
      navigate("/dashboard");
    } catch (err) {
      console.log(err.respone)
      console.log(err.response?.data?.statusText)
      setMessage(err.response?.data?.message || "Login failed");
    }
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const userRes = await axios.get(`${url}/api/user/me`,
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
      <div className="login-container">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>
          {message && <p className="message">{message}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
          <Link to="/register"><button type="submit">Sign- Up</button></Link>
          <div>
            <table>
              <thead>
                <td>Role</td>
                <td>email</td>
                <td>password</td>
              </thead>
              <tbody>
                <td>Admin</td>
                <td>deepak@yadav.com</td>
                <td>123456789</td>
              </tbody>
              <tbody>
                <td>User</td>
                <td>tarun@singh.com</td>
                <td>123456789</td>
              </tbody>
              <tbody>
                <td>User</td>
                <td>sumit@gmail.com</td>
                <td>123456789</td>
              </tbody>
            </table>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
