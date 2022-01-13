import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaPlayCircle, FaRegListAlt } from "react-icons/fa";

export default function NavBar() {
  return (
    <nav className="navbar mb-2 shadow-lg bg-neutral text-neutral-content ">
      <div className="px-2 mx-2 navbar-start">
        <NavLink className="btn  btn-lg rounded-btn" to="/">
          <FaHome className="mr-1" />
          Home
        </NavLink>
      </div>
      <div className="px-2 mx-2 navbar-center lg:flex">
        <div className="flex items-stretch">
          <NavLink
            className="btn btn-ghost btn-lg rounded-btn"
            to="movie-player"
          >
            <FaPlayCircle className="mr-1" />
            Player
          </NavLink>
        </div>
      </div>
      <div className="navbar-end">
        <NavLink className="btn btn-ghost btn-lg rounded-btn" to="quotes-list">
          <FaRegListAlt className="mr-1"/>
          options
        </NavLink>
      </div>
    </nav>

    // <nav className="nav-bar">

    // </nav>
  );
}
