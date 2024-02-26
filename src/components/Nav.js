import React from "react";
import "./styles/Nav.css";
import { NavLink } from "react-router-dom";
import loginImgSrc from "../pages/styles/Assets/login-svgrepo-com.svg";
import logoutImgSrc from "../pages/styles/Assets/logout-2-svgrepo-com.svg";

export default function Nav() {
  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
  };
  return (
    <nav className="mainNav">
      <NavLink to="." className="nav-title">
        #VANLIFE
      </NavLink>
      <NavLink
        to="host"
        style={({ isActive }) => (isActive ? activeStyles : null)}
      >
        Host
      </NavLink>
      <NavLink
        to="about"
        style={({ isActive }) => (isActive ? activeStyles : null)}
      >
        About
      </NavLink>
      <NavLink
        to="vans"
        style={({ isActive }) => (isActive ? activeStyles : null)}
      >
        Vans
      </NavLink>

      {localStorage.getItem("loggedIn") ? (
        <button
          style={{ backgroundColor: "transparent", border: "none" }}
          onClick={() => {
            window.location.reload(false)
            localStorage.removeItem("loggedIn")
            localStorage.removeItem("userID")
            return null
          }}
        >
          <img src={logoutImgSrc} width="30px" />
        </button>
      ) : (
        <NavLink to="login">
          <img src={loginImgSrc} width="30px" />
        </NavLink>
      )}
    </nav>
  );
}
