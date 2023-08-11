import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";

const UserInfo = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/userInfo");
      const value = await response.json();
      setData(value.data);
      setSearchResults(value.data);
      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.log("Error occurred", error);
      setLoading(false); // Set loading to false even if there's an error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      fetch("http://localhost:7000/api/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          fetchData(); // Refresh data after deletion
        })
        .catch((error) => {
          console.error("Error deleting user", error);
        });
    }
  };

  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    if (searchTermLowerCase === "") {
      setSearchResults(data);
    } else {
      const filteredResults = data.filter((item) =>
        item.name.toLowerCase().includes(searchTermLowerCase)
      );
      setSearchResults(filteredResults);
    }
  };

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="flex flex-col">
        <AdimNavBar />

        <div className="p-8">
          <div className="text-5xl text-center underline font-bold text-red-600">
            User Info
          </div>
          <div className="mt-10 flex justify-center space-x-4">
            <input
              type="text"
              placeholder="Search by name..."
              className="p-4 border text-3xl border-2 border-red-400 shadow-xl hover:border-red-500 focus:border-red-500 w-[650px] border-gray-300 outline-none focus:ring focus:ring-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="p-4 bg-blue-500 text-3xl text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none rounded-md"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="mt-8">
            {loading ? ( // Display loading indicator while loading
              <p className="text-3xl font-bold text-gray-600">Loading...</p>
            ) : searchResults.length === 0 ? (
              <p className="text-red-500 text-4xl">User not found.</p>
            ) : (
              <div className="mt-10">
                <table className="w-full border-collapse border-2 shadow-2xl border-gray-600 mt-8">
                  <thead>
                    <tr className="text-3xl">
                      <th className="border border-gray-600 p-4 bg-red-500 text-white font-bold">
                        Id
                      </th>
                      <th className="border border-gray-600 py-2 px-4 bg-red-500 text-white font-bold">
                        Registered Date
                      </th>
                      <th className="border border-gray-600 py-2 px-4 bg-red-500 text-white font-bold">
                        Name
                      </th>
                      <th className="border border-gray-600 py-2 px-4 bg-red-500 text-white font-bold">
                        Email
                      </th>
                      <th className="border border-gray-600 py-2 px-4 bg-red-500 text-white font-bold">
                        Address
                      </th>
                      <th className="border border-gray-600 py-2 px-4 bg-red-500 text-white font-bold">
                        UserType
                      </th>
                      <th className="border border-gray-600 py-2 px-4 bg-red-500 text-white font-bold">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((item) => (
                      <tr key={item._id} className="text-2xl">
                        <td className="border border-gray-600 py-2 px-4">
                          {item._id}
                        </td>
                        <td className="border border-gray-600 py-2 px-4">
                          {item.date}
                        </td>
                        <td className="border border-gray-600 py-2 px-4">
                          {item.name}
                        </td>
                        <td className="border border-gray-600 py-2 px-4">
                          {item.email}
                        </td>
                        <td className="border border-gray-600 py-2 px-4">
                          {item.location}
                        </td>
                        <td className="border border-gray-600 py-2 px-4">
                          {item.userType}
                        </td>
                        <td className="border border-gray-600 py-2 px-4">
                          <AiFillDelete
                            onClick={() => deleteUser(item._id, item.name)}
                            className="cursor-pointer text-red-600"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
