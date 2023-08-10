import React from "react";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";

const AdminCategories = () => {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div>
        <AdimNavBar />
        <div>admin categories</div>
      </div>
    </div>
  );
};

export default AdminCategories;
