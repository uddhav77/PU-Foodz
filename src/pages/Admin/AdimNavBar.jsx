import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";

const AdimNavBar = () => {
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
      <div className="flex p-6 text-white justify-between items-center bg-blue-400 shadow-2xl w-[80.9vw]">
        <div className="text-4xl text-center font-bold">Welcome {name}</div>
        <div className="flex items-center gap-14">
          <div className="text-3xl text-center"> Email: {userEmail}</div>
          <div onClick={handleLogout}>
            {
              <MdOutlineLogout className="text-5xl text-red-600 cursor-pointer" />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdimNavBar;
