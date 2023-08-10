import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";

const UserInfo = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/userInfo");
      const value = await response.json();
      setData(value.data);
      setSearchResults(value.data);
    } catch (error) {
      console.log("Error occurred", error);
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
    if (searchTerm === "") {
      setSearchResults(data);
    } else {
      const filteredResults = data.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="text-5xl text-center underline font-bold text-red-500">
            User Info
          </div>
          <div className="mt-10 flex justify-center ">
            <input
              type="text"
              placeholder="Search by name..."
              className="p-4 border text-3xl border-2 border-cyan-600 shadow-xl hover:border-red-400 focus:border-red-400 w-[650px] border-gray-300 outline-none focus:ring focus:ring-red-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="p-4 bg-blue-500 text-3xl w-[120px] text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <div className="mt-8">
            {searchResults.length === 0 ? (
              <p className="text-red-500 text-4xl">User not found.</p>
            ) : (
              <div className="mt-10">
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    border: "1px solid black",
                    marginTop: "20px",
                  }}
                >
                  <thead className="pt-8">
                    <tr className="text-3xl ">
                      <th
                        style={{
                          border: "1px solid black",
                          padding: "10px",
                          backgroundColor: "#f2f2f2",
                          fontWeight: "bold",
                        }}
                      >
                        Id
                      </th>
                      <th
                        style={{
                          border: "1px solid black",
                          padding: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Registered Date
                      </th>
                      <th
                        style={{
                          border: "1px solid black",
                          padding: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          border: "1px solid black",
                          padding: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Email
                      </th>
                      <th
                        style={{
                          border: "1px solid black",
                          padding: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        Address
                      </th>
                      <th
                        style={{
                          border: "1px solid black",
                          padding: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        UserType
                      </th>
                      <th
                        style={{
                          border: "1px solid black",
                          padding: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item._id} className="text-2xl">
                        <td
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                            verticalAlign: "middle",
                          }}
                        >
                          {item._id}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                            verticalAlign: "middle",
                          }}
                        >
                          {item.date}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                            verticalAlign: "middle",
                          }}
                        >
                          {item.name}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                            verticalAlign: "middle",
                          }}
                        >
                          {item.email}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                            verticalAlign: "middle",
                          }}
                        >
                          {item.location}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                            verticalAlign: "middle",
                          }}
                        >
                          {item.userType}
                        </td>
                        <td
                          style={{
                            border: "1px solid black",
                            padding: "8px",
                            verticalAlign: "middle",
                          }}
                        >
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
