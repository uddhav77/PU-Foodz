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
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="h-screen bg-gray-400">
      <div className="flex p-20 justify-center pt-32">
        <div className="bg-white p-20 rounded-ee-3xl rounded-se-3xl">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="text-5xl font-bold text-red-600 flex justify-center">
              Enter Your e-mail
            </div>
            <div className="pt-8 mt-8 text-3xl mt-8">
              <div className="mt-8">
                <label className="font-bold ">Email</label>
                <br />
                <input
                  type="email" // Use lowercase 'e' for email type
                  placeholder="Enter your email"
                  className="shadow-lg rounded-2xl px-8 pt-6 w-full pb-8 mb-4 border-b border-b-red-800   mt-4"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                />
              </div>

              <div className="pt-8">
                <button
                  type="submit" // Add type="submit" to the button
                  className="bg-red-600 p-6 w-full text-white rounded-2xl shadow-2xl "
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
