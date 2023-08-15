import React, { useEffect, useState } from "react";
import Home from "./Home";
import { useNavigate } from "react-router-dom";
import AdminPanel from "../Admin/AdminPanel";

export default function UserDetails() {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:7000/api/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authToken: window.localStorage.getItem("authToken"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("User Data Response:", data);

        if (data.data && data.data.userType === "Admin") {
          setAdmin(true);
        }

        if (data.status === "error" && data.data === "token expired") {
          alert("Token expired, please log in again");
          window.localStorage.clear();
          // navigate("/userDetails");
        } else {
          setUserData(data.data);
        }
      })
      .catch((error) => {
        console.error("User Data Error:", error);
      });
  }, []);

  console.log("Admin Status:", admin);

  return <div>{admin ? <AdminPanel /> : <Home />}</div>;
}
