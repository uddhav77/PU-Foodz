import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";

const AdminCategories = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/foodCategory");
        const value = await response.json();
        console.log(value);
        setData(value);
      } catch (err) {
        console.log("Error Occurred", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div>
        <AdimNavBar />
        <div>
          {data.map((items) => {
            return <div>{items.CategoryName}</div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
