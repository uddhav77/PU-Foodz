import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Khalti from "../components/Khalti/Khalti";
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
    const hoverStyles = "hover:bg-cyan-600 hover:text-white";
    const animationStyles = "transition duration-300 transform hover:scale-105";

    content = (
      <div className="text-4xl bg-gray-200">
        {orderData.map((order, orderIndex) => (
          <div key={orderIndex} className="p-20 flex gap-8">
            <div
              className={`self-center text-red-500 font-bold ${hoverStyles}`}
            >
              Date: {order.Order_date}
            </div>

            {order.orderDetails.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className={`flex flex-col gap-8 rounded-xl shadow-xl shadow-indigo-500/40 ${animationStyles}`}
                style={{ backgroundColor: "#66B2FF" }}
              >
                <div
                  className={`p-4 ${hoverStyles}`}
                  style={{ width: "600px", height: "630px" }}
                >
                  <img
                    src={item.img}
                    className={`shadow-2xl rounded-2xl ${animationStyles}`}
                    alt="img"
                    style={{ height: "400px", width: "600px" }}
                  />
                  <div className="text-center">
                    <h5 className={`font-bold mt-4 ${hoverStyles}`}>
                      {item.name}
                    </h5>
                    <div className="">
                      <div className="flex justify-center gap-4 mt-2">
                        <div className={hoverStyles}>{item.qty}</div>
                        <div className={hoverStyles}>{item.size}</div>
                      </div>
                      <hr className={`mt-4 ${hoverStyles}`} />
                      <div className="mt-4 text-red-700 font-bold hover:text-black">
                        Rs {item.price}/-
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <Khalti />
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    content = (
      <div className="text-4xl pt-10">
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
