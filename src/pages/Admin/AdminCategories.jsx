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
        <div>
          {data.map((item) => (
            <div key={item._id}>
              {item.CategoryName}{" "}
              <button onClick={() => handleDelete(item._id, item.CategoryName)}>
                Delete
              </button>
            </div>
          ))}
        </div>
        <div>
          <input
            type="text"
            placeholder="Add new category"
            className="p-8 text-3xl hover:shadow-2xl w-full focus:outline-none focus:ring focus:border-blue-300 shadow-lg rounded-2xl w-full border-b border-b-red-800 mt-4"
            name="category"
            value={category}
            onChange={onChange}
          />
          <button onClick={handleClick}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AdminCategories;
