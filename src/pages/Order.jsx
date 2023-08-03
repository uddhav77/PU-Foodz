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

      if (Array.isArray(data.orderData.order_data)) {
        console.log("Setting orderData:", data.orderData.order_data);
        setOrderData(data.orderData.order_data);
      } else {
        console.log("Invalid data structure:", data);
        setOrderData([]);
      }

      // Extract user name and email from the response and set them in the state

      setUserEmail(data.orderData.email);

      setLoading(false); // Data fetching completed, set loading to false
    } catch (error) {
      console.error("Error fetching order data:", error);
      setLoading(false); // Set loading to false even in case of an error
    }
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="mt-44">
        {/* Display user name and email */}

        <div className="text-4xl text-center pt-20 text ">
          Email: {userEmail}
        </div>

        {/* Display order data */}
        {loading ? (
          <div>Loading...</div>
        ) : orderData.length > 0 ? (
          <div className="text-4xl flex flex-wrap justify-center gap-20 pt-10">
            {orderData.map((orderArray, orderIndex) => (
              <div key={orderIndex} className="bg-red-300 p-20">
                {orderArray.map((item, itemIndex) => (
                  <div key={itemIndex} className="">
                    <div
                      className=""
                      style={{ width: "500px", maxHeight: "360px" }}
                    >
                      <img
                        src={item.img}
                        className=""
                        alt="img"
                        style={{ height: "300px", width: "450px" }}
                      />
                      <div className="">
                        <h5 className="">{item.name}</h5>
                        <div className="w-100 p-0" style={{ height: "38px" }}>
                          <span className="m-1">{item.qty}</span>
                          <span className="m-1">{item.size}</span>
                          <span className="m-1">{item.Order_date}</span>
                          <div className="h-100 w-20">Rs{item.price}/-</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div>No order data available.</div>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
