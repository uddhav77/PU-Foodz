// Menu.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Menu = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:7000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setItems(data[0]);
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <div className="flex flex-wrap m pt-36 justify-center">
        {items.map((value) => (
          <Link to={`/detail/${value.id}`} key={value.id}>
            <div className="category-item text-red-500 text-3xl font-bold bg-white ml-10 mt-20 relative rounded-2xl shadow-2xl hover:scale-110 hover:duration-300">
              <div>
                <img
                  src={value.img}
                  alt={value.name}
                  className="w-[550px] relative h-[350px] shadow-2xl rounded-2xl"
                />
              </div>
              <div className="text-center mt-8 bg-red-400 text-white p-2 w-[250px] absolute top-0 right-0">
                {value.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Menu;
