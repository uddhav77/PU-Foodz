import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { BsSearch } from "react-icons/bs";

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

      <div className="pt-52 pl-28 pr-28">
        <input
          className="p-8 text-3xl hover:shadow-2xl rounded-2xl rounded-xl relative  w-full focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Search For Your Favourite Food....."
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="absolute top-60 right-44">
          {<BsSearch className="text-4xl" />}
        </div>
      </div>

      <div className="flex flex-col items-center">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div
              key={data._id}
              className="text-red-400 font-bold flex flex-wrap justify-center text-5xl mt-10"
            >
              <div className="underline text-6xl mt-16">
                {data.CategoryName}
              </div>
              <hr />
              <div className="flex flex-wrap justify-center">
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
                          <div className="text-red-500 text-3xl font-bold bg-white ml-16 mt-20 relative rounded-2xl shadow-2xl hover:scale-110 hover:duration-300">
                            <div>
                              <img
                                src={filterItems.img}
                                alt={filterItems.name}
                                className="w-[500px] relative h-[400px] shadow-2xl rounded-2xl"
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
                  <div>No Food Items Found</div>
                )}
                <div className="">
                  {items.length !== 0 &&
                    items.filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    ).length === 0 && (
                      <div className="text-black text-3xl mt-44">
                        Food Not Found
                      </div>
                    )}
                </div>
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
