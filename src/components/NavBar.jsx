import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { FaRegistered } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  return (
    <div className="text-white font-sans font-medium flex fixed top-0 w-full justify-between text-4xl bg-cyan-500 shadow-2xl font-sans p-10 z-50">
      {" "}
      <div className="flex items-center font-bold text-6xl">
        <h1>
          <Link to="/home">
            <span className="text-blue-900">Hunger</span>Hub
          </Link>
        </h1>
      </div>
      <div className="flex items-center text-4xl">
        <ul className="flex gap-56 md:items-center md:ml-10">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/menu">Menu</Link>
          </li>
          {localStorage.getItem("authToken") ? (
            <li>
              <Link to="/order">My Order</Link>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div>
        {!localStorage.getItem("authToken") ? (
          <div className="flex gap-8 items-center">
            <Link to="/register">
              <FaRegistered className="text-5xl" />
            </Link>
            <Link to="/">
              <BiLogIn className="text-5xl" />
            </Link>
          </div>
        ) : (
          <div className="flex gap-8 items-center">
            <div>
              <Link to="/cart">
                <TfiShoppingCartFull className="text-5xl relative" />
              </Link>
            </div>
            <div className="bg-red-400 rounded-2xl w-[36px] pl-3 text-3xl absolute top-7 right-[100px]">
              2
            </div>

            <div onClick={handleLogout}>
              {
                <MdOutlineLogout className="text-5xl text-red-600 cursor-pointer" />
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
