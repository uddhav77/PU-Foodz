import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useCart, useDispatchCart } from "../components/ContextReducer";
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <div className="text-6xl text-center mt-96 text-white font-bold  ">
          The Cart is Empty!
        </div>
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
    <div>
      {console.log(data)}
      <div className="p-20 flex flex-col items-center justify-center">
        <div className=" flex flex-col justify-center">
          <div className="text-white text-3xl flex items-center p-8 ">
            {data.map((food, index) => (
              <div className="flex gap-44 text-4xl text-black ">
                <div className="flex flex-col items-center ">
                  <p className="font-bold font-cursive text-red-700 text-5xl">
                    #
                  </p>
                  <div className="mt-12">{index + 1}</div>
                </div>
                <div className="flex flex-col items-center ">
                  <p className="font-bold font-cursive  text-red-700 text-5xl">
                    Name
                  </p>
                  <div className="mt-12 ">{food.name}</div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-bold font-cursive text-red-700 text-5xl">
                    {" "}
                    Quantity
                  </p>
                  <div className="mt-12">{food.qty}</div>
                </div>
                <div className=" flex flex-col items-center">
                  <p className="font-bold font-cursive text-red-700 text-5xl">
                    Option
                  </p>
                  <div className="mt-12">{food.size}</div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-bold font-cursive text-4xl text-red-700 text-5xl">
                    Price
                  </p>
                  <div className="mt-12">{food.price}</div>
                </div>

                <div>
                  <button type="button" className="btn mt-[90px]">
                    {
                      <AiFillDelete
                        className="text-5xl fill-red-600"
                        onClick={() => {
                          dispatch({ type: "REMOVE", index: index });
                        }}
                      />
                    }
                  </button>{" "}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="mt-10 text-5xl font-poppins font-bold">
            Total Price: {totalPrice}/-
          </h1>
        </div>
        <div>
          <button
            className="p-6 bg-red-400 text-4xl mt-10 font-bold rounded-xl text-white"
            onClick={handleCheckOut}
          >
            {" "}
            Check Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
