import axios from "axios";
import "./register.css";
import React, { useState } from "react";
import { APIUrl } from "../../utils";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registration, setRegistration] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setRegistration((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { username, email, password } = registration;

    try {
      const response = await axios.post(`${APIUrl}/auth/register`, {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.log("error", error);
      setError(error.response?.data?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Registration
        </button>
        {error && <span className="error">{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
