import React from "react";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  // Get user email from localStorage
  const userEmail = localStorage.getItem("userEmail");
  const name = localStorage.getItem("name");
  return (
    <div>
      <div className="w-[280px]">
        <div className="text-3xl text-center">Welcome {name}</div>
        <div className="text-xl text-center"> {userEmail}</div>
      </div>
      <div onClick={handleLogout}>
        {<MdOutlineLogout className="text-5xl text-red-600 cursor-pointer" />}
      </div>

      <div>
        <Link to="/userinfo">User</Link>
      </div>
    </div>
  );
};

export default AdminPanel;
