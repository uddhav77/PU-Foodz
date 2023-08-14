import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";
import ProgressBar from "./ProgressBar";
import ChartBar from "./ChartBar";

const AdminPanel = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalMenu, setTotalMenu] = useState(0);

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
    const fetchCategoriesData = async () => {
      try {
        const categoriesResponse = await fetch(
          "http://localhost:7000/api/foodCategory"
        );
        const categoriesData = await categoriesResponse.json();

        // Debug: Log categoriesData and its properties to the console
        console.log("Categories Data:", categoriesData);

        if (categoriesData && Array.isArray(categoriesData)) {
          const categoriesCount = categoriesData.length;
          setTotalCategories(categoriesCount);
        } else {
          console.error(
            "Categories data is undefined or has an unexpected format."
          );
        }
      } catch (error) {
        console.error("Error fetching categories data:", error);
      }
    };
    const fetchMenuData = async () => {
      try {
        const menuResponse = await fetch("http://localhost:7000/api/foodMenu");
        const menuData = await menuResponse.json();

        // Debug: Log categoriesData and its properties to the console
        console.log("Menu Data:", menuData);

        if (menuData && Array.isArray(menuData)) {
          const menuCount = menuData.length;
          setTotalMenu(menuCount);
        } else {
          console.error("Menu data is undefined or has an unexpected format.");
        }
      } catch (error) {
        console.error("Error fetching Menu data:", error);
      }
    };

    fetchUserData();
    fetchOrderData();
    fetchCategoriesData();
    fetchMenuData();
  }, []);

  return (
    <>
      <div className="flex w-full">
        <div>
          <SideBar />
        </div>
        <div className="text-5xl flex flex-col">
          <AdimNavBar />
          <div className="relative ">
            <img
              src="https://img.freepik.com/premium-photo/3d-rendering-group-junk-food-3d-illustration-fast-food-concept-copy-space_542094-358.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=ais"
              className="h-[1218px] w-full"
            />
            <div className="absolute top-0">
              <h1 className="text-6xl font-bold text-red-500 underline text-center mt-52">
                DashBoard
              </h1>
              <div className="flex flex-wrap gap-24 ">
                {/* Total Users */}
                <div className="h-[350px] w-[400px] mt-14 relative ml-24">
                  <div
                    className="h-full w-full bg-local hover:blur-sm rounded-2xl shadow-xl"
                    style={{
                      backgroundImage:
                        "url(https://img.freepik.com/free-vector/profile-icons-pack-hand-drawn-style_52683-72294.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph)",
                    }}
                  ></div>
                  <div className="absolute top-[150px] backdrop-blur-md bg-white/30 p-4 font-bold w-[400px] flex justify-center">
                    <Link to="/userinfo">Total User: {totalUsers}</Link>
                  </div>
                </div>

                {/* Total Categories */}
                <div className="h-[350px] w-[400px] mt-14 relative">
                  <div
                    className="h-full w-full bg-local hover:blur-sm rounded-2xl shadow-xl"
                    style={{
                      backgroundImage:
                        "url(https://img.freepik.com/premium-photo/buffet-food-catering-food-party-made-by-aiartificial-intelligence_41969-12071.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=ais)",
                    }}
                  ></div>
                  <div className="absolute top-[130px] text-center backdrop-blur-md bg-white/30 p-4 font-bold w-[400px] flex justify-center">
                    <Link to="/adminCategories">
                      Total Categories:{totalCategories}
                    </Link>
                  </div>
                </div>

                {/* Total Orders */}
                <div className="h-[350px] w-[400px] mt-14 relative">
                  <div
                    className="h-full w-full bg-local hover:blur-sm rounded-2xl shadow-xl"
                    style={{
                      backgroundImage:
                        "url(https://img.freepik.com/premium-vector/mobile-smartphone-with-food-delivery-app-order-food-online-modern-creative-data-graphic-design-application-flat-style-cartoon-illustration-vector_610956-200.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=ais)",
                    }}
                  ></div>
                  <div className="absolute top-[130px] text-center backdrop-blur-md bg-white/30 p-4 font-bold w-[400px] flex justify-center">
                    <Link to="/orderinfo">Total User Order: {totalOrders}</Link>
                  </div>
                </div>
                <div className="h-[350px] w-[400px] mt-14 relative">
                  <div
                    className="h-full w-full bg-local hover:blur-sm rounded-2xl shadow-xl"
                    style={{
                      backgroundImage:
                        "url(https://img.freepik.com/free-photo/top-view-fast-food-mix-mozzarella-sticks-club-sandwich-hamburger-mushroom-pizza-caesar-shrimp-salad-french-fries-ketchup-mayo-cheese-sauces-table_141793-3998.jpg?w=740&t=st=1691813336~exp=1691813936~hmac=0e479ec5ad4d61764eae277eb6bec8ebe557abdb8139d0c6d38d2f7fb4312b79)",
                    }}
                  ></div>
                  <div className="absolute top-[150px] text-center backdrop-blur-md bg-white/30 p-4 font-bold w-[400px] flex justify-center">
                    <Link to="/adminmenu">Total Menu: {totalMenu}</Link>
                  </div>
                </div>
                {/* <div className="ml-24">
                  <ProgressBar />
                </div> */}
                {/* <div>
              <ChartBar />
            </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
