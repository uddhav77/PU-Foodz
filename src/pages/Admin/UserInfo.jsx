import React, { useEffect, useState } from "react";

const UserInfo = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/userInfo");
        const value = await response.json();
        setData(value.data); // Assuming the server returns an object with a "data" property
      } catch (error) {
        console.log("Error occurred", error);
      }
    };
    fetchData();
  }, []);

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
              <td>Delete Button</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserInfo;
