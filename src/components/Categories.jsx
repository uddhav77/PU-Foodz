import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      const limitedItems = data[0].slice(0, 8); // Get the first 8 items from the data array
      setItems(limitedItems);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        {items.map((value, index) => {
          return (
            <Link to={`/detail/${value._id}`}>
              <div
                className=" text-red-500 text-3xl font-bold bg-white ml-10 mt-20 relative rounded-2xl shadow-2xl hover:scale-110 hover:duration-300"
                key={index}
              >
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
          );
        })}
      </div>
    </>
  );
};

export default Menu;
