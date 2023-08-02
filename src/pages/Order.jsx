import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Order() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem("userEmail"));
    await fetch("http://localhost:7000/api/myorderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    })
      .then(async (res) => {
        let response = await res.json();
        await setOrderData(response);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="container">
        <div className="row">
          {orderData && orderData.orderData ? (
            orderData.orderData.order_data
              .slice(0)
              .reverse()
              .map((item, index) => (
                <div key={index} className="">
                  <div
                    className=" mt-3"
                    style={{ width: "16rem", maxHeight: "360px" }}
                  >
                    <img
                      src={item.img}
                      className=""
                      alt="..."
                      style={{ height: "120px", objectFit: "fill" }}
                    />
                    <div className="">
                      <h5 className="">{item.name}</h5>
                      <div className=" w-100 p-0" style={{ height: "38px" }}>
                        <span className="m-1">{item.qty}</span>
                        <span className="m-1">{item.size}</span>
                        <span className="m-1">{item.Order_date}</span>
                        <div className="h-100 w-20">Rs{item.price}/-</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div>No order data available.</div>
          )}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}
