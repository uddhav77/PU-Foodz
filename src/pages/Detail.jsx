import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7000/api/foodData/${id}`
        );
        if (!response.ok) {
          throw new Error("Item not found");
        }
        const data = await response.json();
        setDetail(data);
      } catch (error) {
        console.error(error.message);
        setDetail(null);
      }
    };
    fetchData();
  }, [id]);

  if (detail === null) {
    return (
      <div>
        <NavBar />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="mt-44 flex flex-col items-center  justify-center ">
        <h1 className="font-bold text-red-600 text-7xl underline">
          {" "}
          Description of {detail.name}
        </h1>
        <div className="mt-20 bg-cyan-500 flex p-4 gap-8 m-20 shadow-2xl rounded-2xl ">
          <div className="">
            <img
              src={detail.img}
              alt={detail.name}
              className="h-[600px] h-[600px] shadow-2xl rounded-2xl transition-transform hover:scale-105 cursor-pointer"
            />
          </div>
          <div className="text-white ">
            <h2 className="text-6xl font-bold">{detail.name}</h2>
            <h2 className="text-5xl mt-8 font-medium">
              <span className="text-red-700">Category:</span>{" "}
              {detail.CategoryName}
            </h2>
            <h2 className="text-3xl mt-8">{detail.description}</h2>
            <select className="w-[200px] h-[60px] bg-success text-2xl text-center mt-8 rounded-2xl shadow-xl bg-red-500">
              {Object.keys(detail.options[0]).map((option, index) => (
                <option key={index} className="bg-red-500">
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
