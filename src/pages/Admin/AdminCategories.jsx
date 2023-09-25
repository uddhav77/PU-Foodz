import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";

const AdminCategories = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    // Check if the category field is empty
    if (!category) {
      alert("Category field is empty. Please fill in the category.");
      return;
    }

    try {
      const response = await fetch("http://localhost:7000/api/foodCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CategoryName: category,
        }),
      });

      const json = await response.json();

      if (response.ok && json.success) {
        alert("Added New Category");
        fetchData();
        setCategory("");
      } else {
        alert("Error Occurred");
      }
    } catch (err) {
      console.log("Error Occurred", err);
    }
  };

  const handleDelete = async (id, CategoryName) => {
    if (window.confirm(`Are you sure you want to delete ${CategoryName}?`)) {
      try {
        const response = await fetch(
          `http://localhost:7000/api/foodCategory/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const json = await response.json();

        if (response.ok && json.success) {
          alert("Category Deleted");
          fetchData();
        } else {
          alert("Error Occurred");
        }
      } catch (error) {
        console.error("Error deleting category", error);
      }
    }
  };

  const onChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div>
        <AdimNavBar />
        <div className="relative ">
          <img
            src="https://img.freepik.com/premium-photo/tasty-burgers-with-beef-tomato-cheese-onion-cucumber-lettuce-blue-background-top-view-copy-space-fast-food-banner-take-away-meal-unhealthy-diet-concept_769609-6400.jpg?w=740"
            className="h-[93.5vh] w-full"
          />
          <div className="absolute top-0">
            <div className="text-5xl underline pt-16 font-bold text-red-500 text-center">
              Categories of the Food
            </div>
            <div className="mt-10 ml-24 mr-24 flex justify-center text-3xl">
              <input
                type="text"
                placeholder="Add new category"
                className="p-4 rounded-md border shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 w-[700px]"
                name="category"
                value={category}
                onChange={onChange}
              />
              <button
                onClick={handleClick}
                className="ml-2 p-4 rounded-md bg-blue-500 text-white shadow-2xl hover:bg-blue-600 transition duration-300 w-[140px]"
              >
                Add
              </button>
            </div>

            <div className="mt-16">
              <div className="pl-24 flex mt-4 flex-wrap gap-24 text-4xl  font-bold">
                {data.map((item) => (
                  <div
                    key={item._id}
                    className="bg-gray-400 rounded-3xl shadow-2xl p-10 w-[400px]  backdrop-opacity-10  bg-white/30 cursor-pointer flex flex-col hover:bg-gray-500 transition duration-300"
                  >
                    <div className="text-center">{item.CategoryName}</div>
                    <button
                      onClick={() => handleDelete(item._id, item.CategoryName)}
                      className="p-4 bg-red-500 mt-6 rounded-xl shadow-xl text-white hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
