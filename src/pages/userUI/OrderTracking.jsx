import React, { useState, useEffect } from "react";

const OrderTracking = ({ orderId }) => {
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/api/orderStatus/${orderId}`
        );
        if (response.ok) {
          const data = await response.json();
          setOrderStatus(data.status);
        }
      } catch (error) {
        console.error("Error fetching order status:", error);
      }
    };

    fetchOrderStatus();
  }, [orderId]);

  return (
    <div>
      <h2>Order Tracking</h2>
      <div>
        <p>Order ID: {orderId}</p>
        <p>Status: {orderStatus}</p>
      </div>
    </div>
  );
};

export default OrderTracking;
