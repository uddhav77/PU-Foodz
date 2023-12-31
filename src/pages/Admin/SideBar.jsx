import React, { useState } from "react";

import { BiSolidDashboard } from "react-icons/bi";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaUserTag } from "react-icons/fa";
import { AiOutlineOrderedList } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { MdOutlineMenuBook } from "react-icons/md";

const SideBar = () => {
  return (
    <div className="flex">
      <div
        className={`bg-blue-400 h-screen p-5 pt-8 shadow-2xl ${
          open ? "w-[500px]" : "w-[280px]"
        } relative`}
      >
        <div className="inline-flex items-center mb-8">
          <span className="before:block text-7xl font-bold  before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-500 relative inline-block">
            <span class="relative text-black">Hunger </span>
          </span>
          <span className="font-bold text-blue-800 text-7xl">Hub</span>
        </div>
        <Link to="/admin">
          <div className="mt-20 flex items-center gap-4 backdrop-blur-md bg-white/30 p-4 rounded-xl shadow-xl hover:backdrop-blur-xl hover:bg-white/40 hover:shadow-2xl">
            <BiSolidDashboard
              className={` text-5xl rounded cursor-pointer block float-left me-2 duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-4xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              DashBoard
            </h1>
          </div>
        </Link>
        <Link to="/userinfo">
          <div className="mt-10 flex items-center gap-4 backdrop-blur-md bg-white/30 p-4 rounded-xl shadow-xl hover:backdrop-blur-xl hover:bg-white/40 hover:shadow-2xl">
            <FaUserTag
              className={`text-5xl rounded cursor-pointer block float-left me-2 duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-4xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              User
            </h1>
          </div>
        </Link>
        <Link to="/admincategories">
          <div className="mt-10 flex items-center gap-4 backdrop-blur-md bg-white/30 p-4 rounded-xl shadow-xl hover:backdrop-blur-xl hover:bg-white/40 hover:shadow-2xl">
            <MdOutlineMenuBook
              className={` text-5xl rounded cursor-pointer block float-left me-2 duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-4xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              Categories
            </h1>
          </div>
        </Link>
        <Link to="/adminmenu">
          <div className="mt-10 flex items-center gap-4 backdrop-blur-md bg-white/30 p-4 rounded-xl shadow-xl hover:backdrop-blur-xl hover:bg-white/40 hover:shadow-2xl">
            <BsMenuButtonWideFill
              className={` text-5xl rounded cursor-pointer block float-left me-2 duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-4xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              Menu
            </h1>
          </div>
        </Link>
        <Link to="/addmenu">
          <div className="mt-10 flex items-center gap-4 backdrop-blur-md bg-white/30 p-4 rounded-xl shadow-xl hover:backdrop-blur-xl hover:bg-white/40 hover:shadow-2xl">
            <MdOutlineAddShoppingCart
              className={`text-5xl rounded cursor-pointer block float-left me-2 duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-4xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              Add a Menu
            </h1>
          </div>
        </Link>
        <Link to="/orderInfo">
          <div className="mt-10 flex items-center gap-4 backdrop-blur-md bg-white/30 p-4 rounded-xl shadow-xl hover:backdrop-blur-xl hover:bg-white/40 hover:shadow-2xl">
            <AiOutlineOrderedList
              className={` text-5xl rounded cursor-pointer block float-left me-2 duration-500 ${
                open && "rotate-[360deg]"
              }`}
            />
            <h1
              className={`text-white origin-left font-medium text-4xl duration-300 ${
                !open && "scale-0"
              }`}
            >
              Order
            </h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
