import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Order() {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
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

      if (data.orderData && Array.isArray(data.orderData.order_data)) {
        console.log("Setting orderData:", data.orderData.order_data);
        setOrderData(data.orderData.order_data);
      } else {
        console.log("No order data available.");
        setOrderData([]); // Set orderData to an empty array when there is no order data
      }

      setLoading(false); // Data fetching completed, set loading to false
      setUserName(data.orderData.userName); // Make sure 'userName' is correctly returned from the API
      setUserEmail(data.orderData.email);
    } catch (error) {
      console.error("Error fetching order data:", error);
      setLoading(false); // Set loading to false even in case of an error
    }
  };

  // Split the rendering logic for better readability
  let content;
  if (loading) {
    content = <div>Loading...</div>;
  } else if (orderData.length > 0) {
    content = (
      <div className="text-4xl pt-10">
        {/* Display user name and email */}
        <div className="text-4xl text-center pt-20 text">
          Email: {userEmail}
        </div>

        {orderData.map((orderArray, orderIndex) => (
          <div key={orderIndex} className="bg-red-300 flex p-20 gap-8">
            {/* Display the Order_date */}
            <div className="self-center">{orderArray[0]?.Order_date}</div>

            {orderArray.slice(1).map((item, itemIndex) => (
              <div key={itemIndex} className="flex gap-8">
                <div
                  className="mt-3"
                  style={{ width: "16rem", maxHeight: "360px" }}
                >
                  <img
                    src={item.img}
                    className=""
                    alt="img"
                    style={{ height: "200px", objectFit: "fill" }}
                  />
                  <div className="">
                    <h5 className="">{item.name}</h5>
                    <div className="w-100 p-0" style={{ height: "38px" }}>
                      <span className="m-1">{item.qty}</span>
                      <span className="m-1">{item.size}</span>
                      <div className="h-100 w-20">Rs{item.price}/-</div>
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
        <div className="text-4xl text-center pt-20 text">
          Email: {userEmail}
        </div>
        <div>No order data available.</div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="mt-44">{content}</div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
