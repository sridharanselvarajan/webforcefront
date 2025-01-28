import React, { useState } from "react";
import "../../style/register.css"; // Ensure your styles are in place
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Banner from "./Banner";
import Why from "./Why";
import Work from "./Work";
import Footer from "./Footer";
import Household from "./Household";

function Register() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (details.password !== details.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = {
      name: details.name,
      email: details.email,
      phone: details.phone,
      password: details.password,
      confirmPassword: details.confirmPassword,
      role: details.role,
    };

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        navigate("/");  
      } else {
        alert(data.message); 
         }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Server error. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div>
      <Header />
      <Banner />
      <div className="registersection">
        <h1 className="registerheader">Create an Account</h1>
        <p className="registerpara">
          Register with your details to create an account.
        </p>
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
            placeholder="Create a password"
            required
          />
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={details.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
          <input
            type="text"
            id="phone"
            name="phone"
            value={details.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
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

          <button type="submit">Register</button>
        </form>
        <p className="loginpara loginlink">
          Already have an account? Just{" "}
          <Link className="link" to="/">
            Login
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

export default Register;