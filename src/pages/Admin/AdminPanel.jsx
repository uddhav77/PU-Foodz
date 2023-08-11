import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";

const AdminPanel = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch("http://localhost:7000/api/userInfo");
        const userData = await userResponse.json();
        const userCount = userData.data.length;
        setTotalUsers(userCount);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchOrderData = async () => {
      try {
        const orderResponse = await fetch(
          "http://localhost:7000/api/orderInfo"
        );
        const orderData = await orderResponse.json();
        const orderCount = orderData.data.length;
        setTotalOrders(orderCount);
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchUserData();
    fetchOrderData();
  }, []);

  return (
    <>
      <div className="flex w-full">
        <div>
          <SideBar />
        </div>
        <div className="text-5xl flex flex-col">
          <AdimNavBar />
          <div className="flex flex-wrap gap-24">
            {/* Total Users */}
            <div className="h-[450px] w-[500px] mt-14 relative ml-24">
              <div
                className="h-full w-full bg-local hover:blur-sm rounded-2xl shadow-xl"
                style={{
                  backgroundImage:
                    "url(https://img.freepik.com/free-vector/profile-icons-pack-hand-drawn-style_52683-72294.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph)",
                }}
              ></div>
              <div className="absolute top-[200px] backdrop-blur-md bg-white/30 p-4 font-bold w-[500px] flex justify-center">
                <Link to="/userinfo">Total User: {totalUsers}</Link>
              </div>
            </div>

            {/* Total Categories */}
            <div className="h-[450px] w-[500px] mt-14 relative">
              <div
                className="h-full w-full bg-local hover:blur-sm rounded-2xl shadow-xl"
                style={{
                  backgroundImage:
                    "url(https://img.freepik.com/premium-photo/buffet-food-catering-food-party-made-by-aiartificial-intelligence_41969-12071.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=ais)",
                }}
              ></div>
              <div className="absolute top-[200px] backdrop-blur-md bg-white/30 p-4 font-bold w-[500px] flex justify-center">
                <Link to="/admincategories">Total Categories</Link>
              </div>
            </div>

            {/* Total Orders */}
            <div className="h-[450px] w-[500px] mt-14 relative">
              <div
                className="h-full w-full bg-local hover:blur-sm rounded-2xl shadow-xl"
                style={{
                  backgroundImage:
                    "url(https://img.freepik.com/premium-vector/mobile-smartphone-with-food-delivery-app-order-food-online-modern-creative-data-graphic-design-application-flat-style-cartoon-illustration-vector_610956-200.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=ais)",
                }}
              ></div>
              <div className="absolute top-[200px] backdrop-blur-md bg-white/30 p-4 font-bold w-[500px] flex justify-center">
                <Link to="/orderinfo">Total User Order: {totalOrders}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
