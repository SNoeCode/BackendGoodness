import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import "./Navbar.css";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Logo from "../../assets/Dev.svg";
const Navbar = () => {
  const { authedUser, setAuthedUser } = useContext(UserContext);
  const username = localStorage.getItem("username");
  const isUserSignedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const HandleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/logout",
        {},
        {
          withCredentials: true,
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setAuthedUser(null);
      alert("User Logged Out!");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container-navbar">
        <div className="logo-container">
          <img
            src={Logo}
            alt="My Logo"
            className="logo"
            title="Portifolio coming soon"
          />
        </div>
        <ul className="ul-navbar">
          {isUserSignedIn && username ? (
            <>
              <div className="li-account">
                <li className="li-user">Hi, {username}</li>

                <li>
                  <button className="logout" onClick={HandleLogout}>
                    Sign Out
                  </button>
                </li>
              </div>
            </>
          ) : (
            <>
              <div className="li-login">
                <li className="li-navbar">
                  <Link to="/register">Register</Link>
                </li>

                <li className="li-navbar">
                  <Link to="/login">Login</Link>
                </li>
              </div>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
