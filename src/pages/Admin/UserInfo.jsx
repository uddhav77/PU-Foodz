import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

const UserInfo = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/userInfo");
      const value = await response.json();
      setData(value.data);
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

  return (
    <div>
      <div className="text-4xl">User Info</div>
      <table className="w-[500px] border-2 border-black">
        <thead>
          <tr className="border-2 border-black">
            <th>Id</th>
            <th>Registered Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>UserType</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.date}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.location}</td>
              <td>{item.userType}</td>
              <td>
                <AiFillDelete
                  onClick={() => deleteUser(item._id, item.name)}
                  className="cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
