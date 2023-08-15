import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useCart, useDispatchCart } from "../../components/ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className="text-6xl text-center mt-96 text-white font-bold">
        The Cart is Empty!
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");

    try {
      let response = await fetch("http://localhost:7000/api/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      if (response.status === 200) {
        dispatch({ type: "DROP" });
      } else {
        console.log("Failed to checkout. Status code:", response.status);
        // Handle failure scenarios, show an error message, etc.
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle network errors or other exceptions during the checkout process.
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div className="p-20">
      <table className="table-auto w-full">
        <thead>
          <tr className="text-4xl">
            <th className="px-4 py-2">No.</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Size</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr key={index} className="text-center text-3xl pt-8 font-cursive">
              <td className="border px-8 py-2 ">{index + 1}</td>
              <td className="border px-4 py-2">{food.name}</td>
              <td className="border px-4 py-2">{food.qty}</td>
              <td className="border px-4 py-2">{food.size}</td>
              <td className="border px-4 py-2 text-center">{food.price}</td>
              <td className="border px-4 py-2 ">
                <button type="button">
                  <AiFillDelete
                    className="text-4xl fill-red-600"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-16 text-5xl text-center font-poppins font-bold">
        Total Price: {totalPrice}/-
      </div>
      <div className="flex justify-center">
        <button
          className="p-6 bg-red-400 text-4xl mt-10  font-bold rounded-xl text-white"
          onClick={handleCheckOut}
        >
          Check Out
        </button>
      </div>
    </div>
  );
}
