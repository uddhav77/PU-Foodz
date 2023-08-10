import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";

const AdminPanel = () => {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    // Simulating fetching user data and calculating the total number of users
    // Replace this with your actual data fetching logic
    const fetchUserData = async () => {
      try {
        // Fetch user data from your API or data source
        const response = await fetch("http://localhost:7000/api/userInfo");
        const userData = await response.json();

        // Calculate the total number of users
        const userCount = userData.data.length;

        // Update the totalUsers state
        setTotalUsers(userCount);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="flex w-full">
        <div>
          <SideBar />
        </div>
        <div className="text-5xl flex flex-col">
          <AdimNavBar />
          <div className="flex  flex-wrap">
            <div className="h-[700px] w-[800px]  p-24 mt-8 relative ml-24">
              <div
                className="h-full w-full bg-local hover:blur-sm rounded-2xl shadow-xl"
                style={{
                  backgroundImage:
                    "url(https://img.freepik.com/free-vector/profile-icons-pack-hand-drawn-style_52683-72294.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph)",
                }}
              ></div>
              <div className=" absolute top-[300px]  backdrop-blur-md bg-white/30 p-4 font-bold w-[560px] flex justify-center  ">
                <Link to="/userinfo">Total User: {totalUsers}</Link>
              </div>
            </div>{" "}
            <div className="h-[700px] w-[800px] p-24 mt-8 relative">
              <div
                className="h-full w-full bg-local hover:blur-sm rounded-2xl shadow-xl"
                style={{
                  backgroundImage:
                    "url(https://img.freepik.com/premium-photo/buffet-food-catering-food-party-made-by-aiartificial-intelligence_41969-12071.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=ais)",
                }}
              ></div>
              <div className=" absolute top-[300px]  backdrop-blur-md bg-white/30 p-4 font-bold w-[608px] flex justify-center  ">
                <Link to="/admincategories">Total Categories</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
