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
  const [finalPrice, setFinalPrice] = useState(0); // Default value will be updated later

  const handleAddToCart = async () => {
    const selectedOption = options[size];
    if (selectedOption) {
      const finalPrice = qty * parseInt(selectedOption);
      let food = [];
      for (const item of data) {
        if (item.id === detail._id) {
          food = item;
          break;
        }
      }
      if (food != []) {
        if (food.size === size) {
          await dispatch({
            type: "UPDATE",
            id: detail._id,
            price: finalPrice,
            qty: qty,
          });
          return;
        } else if (food.size != size) {
          await dispatch({
            type: "ADD",
            id: detail._id,
            name: detail.name,
            price: finalPrice,
            img: detail.img,
            size: size,
            qty: qty,
          });
          return;
          // console.log(data);
        }
        return;
      }
      await dispatch({
        type: "ADD",
        id: detail._id,
        name: detail.name,
        price: finalPrice,
        size: size,
        qty: qty,
      });
    }
  };

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
        if (data && data.options && data.options[0]) {
          setOptions(data.options[0]);
          const defaultSize = Object.keys(data.options[0])[0]; // Set the default size based on the first option
          setSize(defaultSize); // Set the default size state
          const defaultPrice = data.options[0][defaultSize]; // Get the price of the default size
          setFinalPrice(qty * parseInt(defaultPrice)); // Set the default final price
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

  useEffect(() => {
    if (priceRef.current) {
      setSize(priceRef.current.value);
    }
  }, []);

  useEffect(() => {
    if (options && size in options) {
      const finalPrice = qty * parseInt(options[size]);
      setFinalPrice(finalPrice);
    }
  }, [size, qty, options]);

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
        <h1 className="font-bold text-red-600 text-6xl underline">
          Description of {detail.name}
        </h1>
        <div className="mt-20 bg-cyan-500 flex p-4 gap-8 text-5xl m-20 shadow-2xl rounded-2xl">
          <div className="">
            <img
              src={detail.img}
              alt={detail.name}
              className="h-[600px] h-[600px] shadow-2xl rounded-2xl transition-transform hover:scale-105 cursor-pointer"
            />
          </div>
          <div className="text-white pt-8">
            <h2 className="text-6xl font-bold">{detail.name}</h2>
            <h2 className="text-5xl mt-8 font-medium">
              <span className="text-red-700">Category:</span>{" "}
              {detail.CategoryName}
            </h2>
            <h2 className="text-3xl mt-8">{detail.description}</h2>
            <div className="flex gap-10">
              <div className="font-bold text-3xl ">
                Size:
                <select
                  className="w-[200px] h-[60px] ml-4 bg-success text-2xl text-center mt-8 rounded-2xl shadow-xl bg-red-500"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  ref={priceRef}
                >
                  {Object.keys(options).map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="font-bold text-3xl">
                Quality:
                <select
                  className="w-[150px] h-[60px] ml-4 bg-success text-2xl text-center mt-8 rounded-2xl shadow-xl bg-red-500"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {Array.from(Array(6), (e, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className=" flex flex-col  gap-8">
              <div className="text-4xl font-bold mt-[44px]">
                Total Price:{" "}
                <span className="text-black">Rs.{finalPrice}/-</span>
              </div>
              <button
                className="p-4 bg-red-500 text-4xl rounded-2xl font-medium"
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
