import React from "react";
import food from "../assets/Images/food.jpg";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="h-screen bg-blue-900">
      <div className="flex p-20 justify-center pt-32">
        <div className="p-20 h-9/12 bg-gradient-to-t  rounded-ss-3xl rounded-es-3xl  from-red-500 via-red-500 to-pink-500 ">
          <span className="flex justify-center text-white text-6xl font-bold">
            WELCOME BACK TO FOODZZ
          </span>

          <img src={food} alt="food" className="ml-24 animate-pulse  mt-20" />
          <div className="text-3xl text-white mt-8 font-medium text-center">
            "Food may be essential as fule for the body, <br /> but GOOD food is
            fuel for the soul"
          </div>
        </div>
        <div className="bg-white p-20 rounded-ee-3xl rounded-se-3xl">
          <form className="w-full">
            <div className="text-5xl font-bold text-red-600 flex justify-center">
              Login Form
            </div>
            <div className="pt-8 mt-8 text-3xl mt-8">
              <div>
                <label className="font-bold  ">Full Name</label>
                <br />

                <input
                  type="name"
                  placeholder="Enter your full name"
                  className="shadow-lg rounded-2xl px-8 pt-6 w-full pb-8 mb-4 border-b border-b-red-800 mt-4"
                />
              </div>
              <div className="mt-8">
                <label className="font-bold ">Email</label>
                <br />
                <input
                  type="Email"
                  placeholder="Enter your email"
                  className="shadow-lg rounded-2xl px-8 pt-6 w-full pb-8 mb-4 border-b border-b-red-800   mt-4"
                />
              </div>
              <div className="mt-8">
                <label className="font-bold">Password</label>
                <br />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="shadow-lg rounded-2xl px-8 pt-6 w-full pb-8 mb-4 mt-4 border-b border-b-red-500"
                />
              </div>

              <div className="flex justify-between">
                <input type="checkbox" className="w-6 h-6 mt-2" />
                <span className="ml-4 ">Remember me</span>
                <div className="ml-32">Forget Password?</div>
              </div>
              <div className="pt-8">
                <button className="bg-red-600 p-6 w-full text-white rounded-2xl shadow-2xl ">
                  Log in
                </button>

                <div className="mt-8 flex justify-center">
                  Create an account?
                  <Link to="/register">
                    <div className=" underline font-medium"> Sign Up</div>
                  </Link>
                </div>
                {/* Create an account */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
