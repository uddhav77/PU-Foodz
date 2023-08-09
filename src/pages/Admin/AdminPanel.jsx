import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";

const AdminPanel = () => {
  return (
    <>
      <div className="flex ">
        <div>
          <SideBar />
        </div>
        <div className="text-5xl flex flex-col">
          <AdimNavBar />
          <Link to="/userinfo">User</Link>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
