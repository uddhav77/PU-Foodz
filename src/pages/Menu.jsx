import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:7000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setItems(data[0]);
      setFoodCat(data[1]);
    };
    fetchData();
  }, []);

  return (
    <>
      <NavBar />

      <div className="mt-44 pl-44 pr-36">
        <input
          className="p-8 border-b border-b-red-800 text-3xl shadow-xl rounded-2xl bg-red-200 w-full "
          placeholder="Search For Your Favourite Food....."
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      <div className="p-8 ">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div
              key={data._id}
              className="text-red-400 font-bold flex flex-wrap text-5xl text-center mt-20"
            >
              <div>{data.CategoryName}</div>
              <hr />
              <div className="flex flex-wrap">
                {items.length !== 0 ? (
                  items
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => (
                      <div
                        key={filterItems._id}
                        className="flex justify-center"
                      >
                        <Link to={`/detail/${filterItems._id}`}>
                          <div className=" text-red-500 text-3xl font-bold bg-white ml-10 mt-20 relative rounded-2xl shadow-2xl hover:scale-110 hover:duration-300">
                            <div>
                              <img
                                src={filterItems.img}
                                alt={filterItems.name}
                                className="w-[550px] relative h-[350px] shadow-2xl rounded-2xl"
                              />
                            </div>
                            <div className="text-center mt-8 bg-red-400 text-white p-2 w-[250px] absolute top-0 right-0">
                              {filterItems.name}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                ) : (
                  <div>No Such Data Found</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>No Food Categories Available</div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Menu;
