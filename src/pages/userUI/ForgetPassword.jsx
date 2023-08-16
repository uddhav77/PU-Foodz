import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [credentials, setCredentials] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const response = await fetch("http://localhost:7000/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (response.ok) {
      // If the request was successful, show an alert
      alert("Password reset email has been sent. Check your inbox.");
    } else {
      // If there was an error, show an error alert
      alert("An error occurred. Please try again later.");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="h-screen bg-gray-400">
      <div className="flex p-20 justify-center pt-60 items-center">
        <div className="bg-white p-20 rounded-3xl">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="text-5xl font-bold text-red-600 flex justify-center">
              Enter Your e-mail
            </div>
            <div className="pt-8 mt-8 text-3xl mt-8">
              <div className="mt-8">
                <label className="font-bold ">Email</label>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="shadow-lg rounded-2xl px-8 pt-6 w-full pb-8 mb-4 border-b border-b-red-800   mt-4"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                />
              </div>

              <div className="pt-8">
                <button
                  type="submit"
                  className="bg-red-600 p-6 w-full text-white rounded-2xl shadow-2xl "
                >
                  Send
                </button>
              </div>
              <div className="mt-8 flex gap-2 justify-end">
                <span>Back to </span>
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

export default ForgetPassword;
