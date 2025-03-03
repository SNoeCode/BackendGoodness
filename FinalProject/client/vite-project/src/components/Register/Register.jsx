import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {

  const [error, setError] = useState("");
  const [register, setRegister] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleRegister = (e) => {
    console.log("reg", register);
    setRegister((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleRegisterConfirm = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username: register.username,
        password: register.password,
       
      });
    alert("User Registered")
     console.log(response.data)
      navigate("/login");
    } catch (error) {
      console.error("Error during login:", error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };
  return (
    <>
      <div> Please Register </div>
      <br />
      <div id="register">
        <h1>Register</h1>
        <input
          id="username"
          onChange={(e) => handleRegister(e)}
          type="text"
          placeholder="Username"
        />
        <br />
        <br />
        <input
          id="password"
          onChange={(e) => handleRegister(e)}
          type="text"
          placeholder="Password"
        />
        <br />
        <br />
        <button onClick={() => handleRegisterConfirm()}>Register</button>
      </div>
    </>
  );
};
export default Register;
