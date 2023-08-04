import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function Order() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const fetchMyOrder = async () => {
    try {
      const userEmail = localStorage.getItem("userEmail");
      const response = await fetch("http://localhost:7000/api/myorderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order data");
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (Array.isArray(data.orderData)) {
        // Restructure the orderData array to a more suitable format
        const formattedOrderData = data.orderData.map((orderItem) => {
          const { Order_date, ...orderDetails } = orderItem;
          return {
            Order_date,
            orderDetails: Object.values(orderDetails),
          };
        });

        console.log("Setting orderData:", formattedOrderData);
        setOrderData(formattedOrderData);
      } else {
        console.log("No order data available.");
        setOrderData([]); // Set orderData to an empty array when there is no order data
      }

      setLoading(false); // Data fetching completed, set loading to false
      setUserEmail(data.email); // Update the state with the user email
    } catch (error) {
      console.error("Error fetching order data:", error);
      setLoading(false); // Set loading to false even in case of an error
    }
  };

  // Split the rendering logic for better readability
  let content;
  if (loading) {
    content = (
      <div className="pt-96 text-5xl flex justify-center">
        {<AiOutlineLoading3Quarters className="animate-spin" />} Loading
      </div>
    );
  } else if (orderData.length > 0) {
    content = (
      <div className="text-4xl bg-gray-200 ">
        {orderData.map((order, orderIndex) => (
          <div key={orderIndex} className=" p-20 flex gap-8">
            {/* Display the Order_date */}
            <div className="self-center text-red-500 font-bold">
              Date: {order.Order_date}
            </div>

            {order.orderDetails.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex flex-col gap-8 rounded-xl shadow-xl shadow-indigo-500/40 "
                style={{ backgroundColor: "#66B2FF" }}
              >
                <div
                  className="p-4"
                  style={{ width: "600px", height: "630px" }}
                >
                  <img
                    src={item.img}
                    className="shadow-2xl rounded-2xl"
                    alt="img"
                    style={{ height: "400px", width: "600px" }}
                  />
                  <div className="text-center">
                    <h5 className="font-bold mt-4">{item.name}</h5>
                    <div className="">
                      <div className="flex justify-center gap-4 mt-2">
                        <div>{item.qty}</div>
                        <div>{item.size}</div>
                      </div>
                      <hr className="mt-4" />
                      <div className="mt-4 text-red-500 font-bold">
                        Rs {item.price}/-
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div className="text-4xl pt-10">
        {/* Display user name and email */}
        {/* <div className="text-4xl text-center  text">Email: {userEmail}</div> */}
        <div>No order data available.</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="pt-32">{content}</div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
