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
                {order.order_data.length > 0 && (
                  <>
                    {order.order_data.map((item, subIndex) => (
                      <div key={subIndex}>
                        <h4>Order {subIndex + 1}:</h4>
                        {Object.values(item).map((items, itemIndex) => (
                          <div key={itemIndex}>
                            <p>Name: {items.name}</p>
                            <img
                              src={items.img}
                              alt={items.name}
                              className="h-10 w-10"
                            />
                            <p>Price: {items.price}</p>
                            <p>Quantity: {items.qty}</p>
                            <p>Size: {items.size}</p>
                          </div>
                        ))}
                        <p>Order Date: {item.Order_date}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
