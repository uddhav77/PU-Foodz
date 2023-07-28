import React from "react";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";

const NavBar = () => {
  return (
    <div className="text-white font-sans font-medium flex fixed w-full justify-between text-4xl bg-red-500 shadow-2xl font-sans p-10">
      <div className="flex items-center font-bold text-5xl">
        <h1>
          <Link to="/">
            <span className="text-blue-900">FOOD</span>ZZZ
          </Link>
        </h1>
      </div>
      <div className="flex items-center">
        <ul className="flex gap-56">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/order">Order </Link>
          </li>
          <li>
            <Link to="/cart">Cart </Link>
          </li>
        </ul>
      </div>
      <div className="text-3xl flex items-center">
        <Link to="/register">
          <button className="p-6 rounded-xl shadow-2xl mr-10 bg-red-700 hover:bg-blue-800">
            Register
          </button>
        </Link>
        <Link to="/login">{<BiLogIn className="text-5xl " />}</Link>
      </div>
    </div>
  );
};

export default NavBar;
