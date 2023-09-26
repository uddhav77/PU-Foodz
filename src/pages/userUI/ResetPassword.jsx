import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [credentials, setCredentials] = useState({
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const response = await fetch(
      `http://localhost:7000/api/reset-password/${id}/${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    if (json.Status === "Success") {
      navigate("/login");
    }
    console.log(json);
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="h-screen bg-gray-400">
      <div className="flex p-20 justify-center pt-32 items-center">
        <div>
          <img
            src="https://imgs.search.brave.com/MdDtITJwQDZlUWAzuygscqRXPyonTHhFkQuGVR_5xBM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQx/MjA5MjU5Ny92ZWN0/b3IvcmVzZXQtcGFz/c3dvcmQtYWN0aW9u/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1DaUQwdHJGTU9i/SGRRVk5XVS16YlN6/QjJrSlhnQnlsenoz/M2h3dFY3S1JjPQ"
            className="h-[650px] rounded-l-3xl "
          />
        </div>
        <div className="bg-white p-20 rounded-ee-3xl rounded-se-3xl">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="text-5xl font-bold text-red-600 flex justify-center">
              Reset Password
            </div>
            <div className="pt-8 mt-8 text-3xl mt-8">
              <div className="mt-8">
                <label className="font-bold ">New Password</label>
                <br />
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="shadow-lg rounded-2xl px-8 pt-6 w-full pb-8 mb-4 border-b border-b-red-800   mt-4"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                />
              </div>

              <div className="pt-8">
                <button
                  type="submit" // Add type="submit" to the button
                  className="bg-red-600 p-6 w-full text-white rounded-2xl shadow-2xl "
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
