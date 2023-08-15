import React, { useState } from "react";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";

const AddMenu = () => {
  const [category, setCategory] = useState("");
  const [foodName, setFoodName] = useState("");
  const [halfPrice, setHalfPrice] = useState("");
  const [fullPrice, setFullPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:7000/api/foodMenu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          CategoryName: category,
          name: foodName,
          options: [{ half: halfPrice, full: fullPrice }],
          description: description,
          img: imageUrl,
        }),
      });

      const json = await response.json();

      if (response.ok && json.success) {
        alert("New food menu item added!");
        setCategory("");
        setFoodName("");
        setHalfPrice("");
        setFullPrice("");
        setDescription("");
        setImageUrl("");
      } else {
        alert("Error Occurred");
      }
    } catch (err) {
      console.log("Error Occurred", err);
    }
  };

  return (
    <div>
      <div className="flex">
        <SideBar />
        <div>
          <AdimNavBar />
          <div className="relative">
            <img
              src="https://img.freepik.com/free-photo/flat-lay-plate-mussel-pasta-with-copyspace_23-2148234946.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=ais"
              alt="Food"
              className="h-[93.5vh] w-full object-cover"
            />
            <div className="text-3xl mt-4 absolute top-0 ml-[550px]">
              <h1 className="text-red-400 underline text-5xl text-center font-bold">
                Add a Menu
              </h1>
              <div className="flex flex-col gap-4 mt-8 backdrop-blur-xl bg-white/30 rounded-2xl shadow-2xl p-8">
                <label className="text-red-500 text-3xl font-medium">
                  Categories Name:
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="p-4 text-3xl w-[800px] rounded-xl shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter the Category"
                />
                <label className="text-red-500 text-3xl font-medium">
                  Food Name:
                </label>
                <input
                  type="text"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="p-4 text-3xl w-[800px] rounded-xl shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter the Food Name"
                />
                <label className="text-red-500 text-3xl font-medium">
                  Half-price:
                </label>
                <input
                  type="text"
                  value={halfPrice}
                  onChange={(e) => setHalfPrice(e.target.value)}
                  className="p-4 text-3xl w-[800px] rounded-xl shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter the Half Price"
                />
                <label className="text-red-500 text-3xl font-medium">
                  Full-price:
                </label>
                <input
                  type="text"
                  value={fullPrice}
                  onChange={(e) => setFullPrice(e.target.value)}
                  className="p-4 text-3xl w-[800px] rounded-xl shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter the Full Price"
                />
                <label className="text-red-500 text-3xl font-medium">
                  Description:
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-4 text-3xl w-[800px] rounded-xl shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter the Description"
                />
                <label className="text-red-500 text-3xl font-medium">
                  Image URL:
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="p-4 text-3xl w-[800px] rounded-xl shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter the Image URL"
                />
                <button
                  onClick={handleClick}
                  className="ml-2 p-4 rounded-md bg-blue-500 text-white font-bold shadow-2xl hover:bg-blue-600 transition duration-300 w-[140px]"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
