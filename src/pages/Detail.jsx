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
      <div className="text-red-500 pt-44 justify-center ">
        <h1 className="text-6xl underline font-bold font-cursive text-center">
          Description of {detail.name}
        </h1>
        <div className="text-red-500 text-4xl bg-cyan-300 ml-32 mt-20 rounded-2xl w-[500px] shadow-2xl">
          <div>
            <img
              src={detail.img}
              alt={detail.name}
              className="w-[500px] h-[400px] shadow-2xl"
            />
          </div>
          <div className="p-10">
            <div className="h-[120px]">
              <h2 className="text-center font-medium">{detail.CategoryName}</h2>
            </div>
            <div className="flex justify-between text-3xl items-center">
              <div>{detail.description}</div>
              <div>
                {/* <button
                  onClick={() => {
                    // Handle addToCart function logic here
                  }}
                  className="text-2xl font-medium text-white w-[250px] bg-cyan-600 p-4 rounded-xl"
                >
                  Add to cart
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
