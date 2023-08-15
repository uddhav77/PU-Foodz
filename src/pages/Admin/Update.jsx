// UpdateFoodItem.js

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";

function Update() {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemOptionsHalf, setItemOptionsHalf] = useState("");
  const [itemOptionsFull, setItemOptionsFull] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:7000/api/foodMenu/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: itemName,
          options: [
            {
              half: itemOptionsHalf,
              full: itemOptionsFull,
            },
          ],
          description: description,
        }),
      });

      if (response.ok) {
        const updatedItem = await response.json();
        console.log("Item updated:", updatedItem);
        alert("Food Menu Updated Sucessfully!!!");
        // Perform any additional actions after successful update
      } else {
        const errorData = await response.json();
        console.log("Error updating item:", errorData.error);
        // Handle error response
      }
    } catch (error) {
      console.error("Request failed:", error);
      // Handle fetch error
    }
  };

  return (
    <div className="flex">
      <div className="flex">
        <SideBar />
      </div>
      <div className="flex flex-col">
        <AdimNavBar />

        <div className="relative ">
          <img
            src="https://img.freepik.com/free-photo/flat-lay-breakfast-composition-with-copyspace_23-2148200688.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=ais"
            className="h-[93.5vh] w-full"
          />
          <div className="p-8 absolute top-0 mt-20 flex flex-col items-center justify-center">
            <form
              onSubmit={handleUpdate}
              className="space-y-4 text-3xl backdrop-blur-md bg-white/30 mt-4 ml-[500px] shadow-2xl rounded-xl p-16 "
            >
              <h1 className="text-5xl font-bold mb-4 text-red-400 text-center">
                Update Food Item
              </h1>
              <label htmlFor="itemName" className="block font-medium">
                Item Name:
              </label>
              <input
                type="text"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="border w-[900px]  hover:shadow-2xl p-4 rounded-xl backdrop-blur-sm bg-white/90 focus:outline-none focus:ring focus:border-blue-300"
              />

              <label htmlFor="itemOptionsHalf" className="block font-medium">
                Half Price:
              </label>
              <input
                type="text"
                id="itemOptionsHalf"
                value={itemOptionsHalf}
                onChange={(e) => setItemOptionsHalf(e.target.value)}
                className="border p-2 w-[900px]  hover:shadow-2xl p-4 rounded-xl backdrop-blur-sm bg-white/90 focus:outline-none focus:ring focus:border-blue-300"
              />

              <label htmlFor="itemOptionsFull" className="block font-medium">
                Full Price:
              </label>
              <input
                type="text"
                id="itemOptionsFull"
                value={itemOptionsFull}
                onChange={(e) => setItemOptionsFull(e.target.value)}
                className="border  w-[900px]  hover:shadow-2xl p-4 rounded-xl backdrop-blur-sm bg-white/90 focus:outline-none focus:ring focus:border-blue-300"
              />
              <label htmlFor="description" className="block font-medium">
                Descriptions:
              </label>
              <textarea
                type="text"
                value={description}
                id="description"
                onChange={(e) => setDescription(e.target.value)}
                className="border  rounded-md w-[900px]  hover:shadow-2xl p-6 rounded-xl backdrop-blur-sm bg-white/90 focus:outline-none focus:ring focus:border-blue-300"
              />
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-4 font-bold rounded-md hover:bg-blue-600"
                >
                  Update Item
                </button>
              </div>
              <Link
                to="/adminmenu"
                className="block text-gray-700 text-red-400 font-bold text-center  text-4xl underline"
              >
                Back to Admin Menu
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
