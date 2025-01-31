import React, { useState } from "react";
import "../../style/login.css";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Banner from "./Banner";
import Why from "./Why";
import Work from "./Work";
import Footer from "./Footer";
import Household from "./Household";

// Notification Component
function Notification({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        backgroundColor: type === "success" ? "#4CAF50" : "#F44336",
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        animation: "fadeInOut 4s ease",
      }}
    >
      {message}
      <button
        onClick={onClose}
        style={{
          marginLeft: "10px",
          backgroundColor: "transparent",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        ✖
      </button>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    role: "",
  });
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!details.email || !details.password || !details.number || !details.role) {
      setNotification({ message: "Please fill in all fields.", type: "error" });
      return;
    }

    const userData = {
      name: details.name,
      email: details.email,
      password: details.password,
      number: details.number,
      role: details.role,
    };

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userNumber", data.user.number);

        // Show success notification
        setNotification({ message: "Login successful!", type: "success" });

        setTimeout(() => {
          navigate("/home");
        }, 2000); // Redirect after 2 seconds
      } else {
        setNotification({ message: data.message, type: "error" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setNotification({ message: "Server error. Please try again later.", type: "error" });
    }
  };

  const handleNotificationClose = () => {
    setNotification({ message: "", type: "" });
  };

  return (
    <div>
      <Header />
      <Banner />

      {/* Notification */}
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={handleNotificationClose}
      />

      <div className="loginsection">
        <h1 className="loginheader">Welcome Back</h1>
        <p className="loginpara">Please enter your details to login.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={details.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            value={details.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            value={details.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
          <input
            type="number"
            id="number"
            name="number"
            value={details.number}
            onChange={handleChange}
            placeholder="Enter your number"
            required
          />

          <fieldset>
            <legend>Role</legend>
            <label>
              <input
                type="radio"
                name="role"
                value="customer"
                checked={details.role === "customer"}
                onChange={handleChange}
              />
              Customer
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="worker"
                checked={details.role === "worker"}
                onChange={handleChange}
              />
              Worker
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="company"
                checked={details.role === "company"}
                onChange={handleChange}
              />
              Company
            </label>
          </fieldset>

          <button type="submit">Login</button>
        </form>

        <p className="registerpara registerlink">
          New to One? Just{" "}
          <Link className="link" to="/register">
            Register
          </Link>
        </p>
      </div>

      <Work />
      <Why />
      <Household />
      <Footer />
    </div>
  );
}

export default Login;
