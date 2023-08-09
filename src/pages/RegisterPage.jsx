import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:7000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      });
      const json = await response.json();

      if (response.ok && json.success) {
        // Registration successful
        alert("Registration successful");
        // Navigate to the login page
        window.location.href = "/login";
      } else if (!response.ok) {
        // Handle non-2xx HTTP responses
        const errorMessage = json.message || "Registration failed";
        alert(errorMessage);
      } else {
        // Registration failed
        const errorMessage = json.message || "Enter Valid Credentials";
        alert(errorMessage);
      }
    } catch (error) {
      // Handle network errors
      alert("An error occurred while registering. Please try again later.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="h-full bg-gray-400">
      <div className="flex p-20 justify-center pt-14">
        <div className="relative">
          <img
            src="https://img.freepik.com/free-photo/top-view-batch-cooking-arrangement-with-healthy-food_23-2149092404.jpg?w=360"
            className="h-full w-[800px] rounded-ss-3xl rounded-es-3xl"
          />
          <div className="absolute top-[500px] flex flex-col items-center p-8  backdrop-blur-sm bg-white/40 shadow-2xl w-full">
            <span className=" text-blue-900 text-7xl font-fantasy gap-4 flex font-bold">
              WELCOME TO{" "}
              <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-500 relative inline-block">
                <span class="relative text-black">Hunger</span>
              </span>
              <span className="text-blue-800">Hub</span>
            </span>

            <div className="text-3xl text-black mt-8 font-medium text-center ">
              "Food may be essential as fule for the body, <br /> but GOOD food
              is fuel for the soul"
            </div>
          </div>
        </div>
        <div className="bg-white p-20 rounded-ee-3xl rounded-se-3xl">
          <form className="w-full">
            <div className="text-5xl font-bold text-red-600 flex justify-center">
              Registration Form
            </div>
            <div className="pt-8 mt-8 text-3xl mt-8">
              <div>
                <label className="font-bold  ">Full Name</label>
                <br />

                <input
                  type="name"
                  placeholder="Enter your full name"
                  className="p-8 text-3xl hover:shadow-2xl  w-full focus:outline-none focus:ring focus:border-blue-300 shadow-lg rounded-2xl w-full border-b border-b-red-800 mt-4 "
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                />
              </div>
              <div className="mt-8">
                <label className="font-bold ">Email</label>
                <br />
                <input
                  type="Email"
                  placeholder="Enter your email"
                  className="p-8 text-3xl hover:shadow-2xl  w-full focus:outline-none focus:ring focus:border-blue-300 shadow-lg rounded-2xl w-full border-b border-b-red-800 mt-4 "
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                />
              </div>
              <div className="mt-8">
                <label className="font-bold">Password</label>
                <br />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="p-8 text-3xl hover:shadow-2xl  w-full focus:outline-none focus:ring focus:border-blue-300 shadow-lg rounded-2xl w-full border-b border-b-red-800 mt-4 "
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                />
              </div>

              {/* <div className="mt-8">
                <label className="font-bold">Confirm Password</label>
                <br />
                <input
                  type="password"
                  placeholder="Enter confirm password"
                  className="shadow-lg rounded-2xl px-8 pt-6 w-full pb-8 mb-4 mt-4 border-b border-b-red-800 "
                />
              </div> */}

              <div className="mt-8">
                <label className="font-bold">Address</label>
                <br />
                <input
                  type="text"
                  placeholder="Your current location"
                  className="p-8 text-3xl hover:shadow-2xl  w-full focus:outline-none focus:ring focus:border-blue-300 shadow-lg rounded-2xl w-full border-b border-b-red-800 mt-4 "
                  name="geolocation"
                  value={credentials.geolocation}
                  onChange={onChange}
                />
              </div>
              <div className="pt-10">
                <button
                  className="bg-red-600 p-6 w-full   text-white rounded-2xl shadow-2xl "
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>

              <div className="mt-8 flex justify-center">
                Already have an account?
                <Link to="/login">
                  <div className=" underline font-medium"> Log In</div>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
