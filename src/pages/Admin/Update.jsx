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
        <div className="p-8">
          <h1 className="text-4xl font-semibold mb-4 text-red-400">
            Update Food Item
          </h1>
          <form onSubmit={handleUpdate} className="space-y-4 text-3xl">
            <label htmlFor="itemName" className="block font-medium">
              Item Name:
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="border p-2 rounded-md w-full"
            />

            <label htmlFor="itemOptionsHalf" className="block font-medium">
              Half Options:
            </label>
            <input
              type="text"
              id="itemOptionsHalf"
              value={itemOptionsHalf}
              onChange={(e) => setItemOptionsHalf(e.target.value)}
              className="border p-2 rounded-md w-full"
            />

            <label htmlFor="itemOptionsFull" className="block font-medium">
              Full Options:
            </label>
            <input
              type="text"
              id="itemOptionsFull"
              value={itemOptionsFull}
              onChange={(e) => setItemOptionsFull(e.target.value)}
              className="border p-2 rounded-md w-full"
            />
            <label htmlFor="description" className="block font-medium">
              Descriptions:
            </label>
            <textarea
              type="text"
              value={description}
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded-md w-full"
            />

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Update Item
            </button>
          </form>
          <Link
            to="/adminmenu"
            className="block mt-4 text-gray-700 text-3xl hover:underline"
          >
            Back to Admin Menu
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Update;
