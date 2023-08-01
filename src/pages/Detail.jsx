import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useCart, useDispatchCart } from "../components/ContextReducer";

const Detail = () => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [options, setOptions] = useState({});

  const handleAddToCart = async () => {
    // Calculate finalPrice directly using the most up-to-date values of qty, size, and options
    const finalPrice = qty * parseInt(options[size]);

    await dispatch({
      type: "ADD",
      id: detail._id,
      name: detail.name,
      price: finalPrice,
      size: size,
      qty: qty,
    });
    console.log(data);
  };
  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

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
        if (data && data.options) {
          setOptions(data.options);
        } else {
          setOptions({});
        }
      } catch (error) {
        console.error(error.message);
        setDetail(null);
        setOptions({});
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
      <div className="mt-44 flex flex-col items-center justify-center">
        <h1 className="font-bold text-red-600 text-7xl underline">
          Description of {detail.name}
        </h1>
        <div className="mt-20 bg-cyan-500 flex p-4 gap-8 m-20 shadow-2xl rounded-2xl">
          <div className="">
            <img
              src={detail.img}
              alt={detail.name}
              className="h-[600px] h-[600px] shadow-2xl rounded-2xl transition-transform hover:scale-105 cursor-pointer"
            />
          </div>
          <div className="text-white">
            <h2 className="text-6xl font-bold">{detail.name}</h2>
            <h2 className="text-5xl mt-8 font-medium">
              <span className="text-red-700">Category:</span>{" "}
              {detail.CategoryName}
            </h2>
            <h2 className="text-3xl mt-8">{detail.description}</h2>
            <div className="flex gap-8">
              <select
                className="w-[200px] h-[60px] bg-success text-2xl text-center mt-8 rounded-2xl shadow-xl bg-red-500"
                onChange={(e) => setSize(e.target.value)}
                ref={priceRef}
              >
                {Object.keys(detail.options[0]).map((option, index) => (
                  <option key={index} className="bg-red-500">
                    {option}
                  </option>
                ))}
              </select>
              <select
                className="w-[200px] h-[60px] bg-success text-2xl text-center mt-8 rounded-2xl shadow-xl bg-red-500"
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="pt-24 flex items-center gap-8">
              <div className="text-4xl">Rs.{finalPrice}/-</div>
              <button
                className="p-4 bg-red-400 text-4xl rounded-2xl font-medium"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
