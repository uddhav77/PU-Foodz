import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/foodMenu");
      const value = await response.json();
      console.log(value);
      setData(value);
    } catch (err) {
      console.log("Error Occurred", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex">
      <div className="gap-8">
        <SideBar />
      </div>
      <div className="flex flex-col ">
        <AdimNavBar />
        <div className="flex flex-wrap  gap-8">
          {data.map((item) => (
            <div key={item._id}>
              <div>{item.CategoryName}</div>
              <div>{item.name}</div>
              <img src={item.img} alt={item.name} className="h-10 w-10" />
              <div>
                {item.options.map((option, index) => (
                  <div key={index}>
                    Half: {option.half} | Full: {option.full}
                  </div>
                ))}
              </div>
              <div className="w-16">{item.description}</div>
              <Link to={`/update/${item._id}`}>Update</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
