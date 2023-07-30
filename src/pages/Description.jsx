import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

const Description = () => {
  const { name } = useParams();
  const [detail, setDetail] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`
      );
      const data = await response.json();
      setDetail(data.meals);
    };
    fetchData();
  });
  return (
    <div>
      <NavBar />
      <div className="text-red-500 pt-44 justify-center ">
        <h1 className="text-6xl underline font-bold font-cursive text-center">
          Menu of {name}
        </h1>
        <div className="flex flex-wrap">
          {detail.map((item, index) => (
            <div
              className="text-red-500 text-4xl bg-cyan-300 ml-32 mt-20  rounded-2xl w-[500px] shadow-2xl "
              key={index}
            >
              <div></div>
              <img
                src={item.strMealThumb}
                alt={item.strMeal}
                className="w-[500px] h-[400px] shadow-2xl"
              />
              <div className="p-10">
                <div className="h-[120px]">
                  <h2 className="text-center font-medium">{item.strMeal}</h2>
                </div>
                {/* <div className="flex justify-center"> */}
                {/* <input
                    type="number"
                    className="w-[60px] text-center bg-red-400"
                  /> */}
                <div className="flex justify-between text-3xl items-center">
                  <div>Rs. 350</div>
                  <div>
                    <button className="text-2xl font-medium text-white w-[250px] bg-cyan-600 p-4 rounded-xl">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Description;
