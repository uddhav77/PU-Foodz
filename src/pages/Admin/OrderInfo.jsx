import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";

const OrderInfo = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/orderInfo");
        const value = await response.json();
        console.log(value);
        setData(value.data);
      } catch (err) {
        console.log("Error Occurred", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div>
        <AdimNavBar />
        <div>
          {data.map((order, index) => (
            <div key={index}>
              <h3>Email: {order.email}</h3>
              <div>
                {order.order_data.map((item, subIndex) => (
                  <div key={subIndex}>
                    <h4>Order {subIndex + 1}:</h4>
                    <p>Name: {item[0].name}</p>
                    <img
                      src={item[0].img}
                      alt={item[0].name}
                      className="h-10 w-10"
                    />
                    <p>Price: {item[0].price}</p>
                    <p>Quantity: {item[0].qty}</p>
                    <p>Size: {item[0].size}</p>
                    <p>Order Date: {item.order_date}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
