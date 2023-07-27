import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="text-blue-500 text-4xl font-sans p-10">
      <ul className="flex justify-between">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/order">Order </Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login"> LogIn </Link>
        </li>
        {/* <li>
          <Link to="/post/:id">Post</Link>
        </li>
        <li>
          <Link to="/todo">ToDo</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default NavBar;
