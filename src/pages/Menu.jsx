import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

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
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = items.filter((value) =>
      value.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [search, items]);

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
      <div className="flex flex-wrap  justify-center">
        {filteredItems.length === 0 ? (
          <div className="text-center mt-8 text-5xl text-red-500 font-medium">
            Food not available
          </div>
        ) : (
          filteredItems.map((value) => (
            <Link to={`/detail/${value._id}`} key={value._id}>
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
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default Menu;
