import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember me" checkbox
  const navigate = useNavigate();

  useEffect(() => {
    const storedCredentials = localStorage.getItem("rememberedCredentials");
    if (rememberMe && storedCredentials) {
      const { email, name } = JSON.parse(storedCredentials);
      setCredentials({ ...credentials, email, name });
    }
  }, [rememberMe, credentials]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:7000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        userType: credentials.userType,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      if (rememberMe) {
        localStorage.setItem(
          "rememberedCredentials",
          JSON.stringify({
            email: credentials.email,
            name: credentials.name,
          })
        );
      } else {
        localStorage.removeItem("rememberedCredentials");
      }

      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("name", credentials.name);
      localStorage.setItem("authToken", json.authToken);
      navigate("/userDetails"); // Use navigate hook
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <div className="h-screen bg-gray-400">
      <div className="flex p-20 justify-center pt-32">
        <div className="relative">
          <img
            src="https://img.freepik.com/free-photo/top-view-batch-cooking-arrangement-with-healthy-food_23-2149092401.jpg?w=360"
            className="h-[1060px] w-[800px] rounded-ss-3xl rounded-es-3xl"
            alt="Food"
          />
          <div className="absolute top-[450px] flex flex-col items-center p-8 backdrop-blur-sm bg-white/40 shadow-2xl w-full ">
            <span className="text-blue-900 text-7xl font-fantasy gap-4 flex font-bold">
              WELCOME TO{" "}
              <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-500 relative inline-block">
                <span class="relative text-black">Hunger</span>
              </span>
              <span className="text-blue-800">Hub</span>
            </span>
            <div className="text-3xl text-black mt-8 font-medium text-center ">
              "Food may be essential as fuel for the body, <br /> but GOOD food
              is fuel for the soul"
            </div>
          </div>
        </div>
        <div className="bg-white p-20 rounded-ee-3xl rounded-se-3xl">
          <form className="w-full">
            <div className="text-5xl font-bold text-red-600 flex justify-center">
              Login Form
            </div>
            <div className="pt-8 mt-8 text-3xl mt-8">
              <div>
                <label className="font-bold">Full Name</label>
                <br />
                <input
                  type="name"
                  placeholder="Enter your full name"
                  className="p-8 text-3xl hover:shadow-2xl w-full focus:outline-none focus:ring focus:border-blue-300 shadow-lg rounded-2xl w-full border-b border-b-red-800 mt-4"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                />
              </div>
              <div className="mt-8">
                <label className="font-bold">Email</label>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-8 text-3xl hover:shadow-2xl w-full focus:outline-none focus:ring focus:border-blue-300 shadow-lg rounded-2xl w-full border-b border-b-red-800 mt-4"
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
                  className="p-8 text-3xl hover:shadow-2xl w-full focus:outline-none focus:ring focus:border-blue-300 shadow-lg rounded-2xl w-full border-b border-b-red-800 mt-4"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                />
              </div>
              <div className="flex justify-between items-center mt-6">
                <label>
                  <input
                    type="checkbox"
                    className="w-6 h-6 mt-2"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <span className="ml-2">Remember me</span>
                </label>
                <Link to="/forgot-password">
                  <div className="ml-32 cursor-pointer underline">
                    Forget Password?
                  </div>
                </Link>
              </div>
              <div className="pt-10">
                <button
                  className="bg-red-600 p-6 w-full text-white rounded-2xl shadow-2xl"
                  onClick={handleSubmit}
                >
                  Log in
                </button>
                <div className="mt-8 flex justify-center">
                  Create an account?
                  <Link to="/register">
                    <div className="underline font-medium"> Sign Up</div>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
