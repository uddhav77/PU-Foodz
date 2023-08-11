import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";

const OrderInfo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:7000/api/orderInfo");
        const value = await response.json();
        console.log(value);
        setData(value.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        console.log("Error Occurred", err);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex">
      <div className="">
        <SideBar />
      </div>
      <div className="">
        <AdimNavBar />
        <div className="p-8">
          {loading ? ( // Display loading indicator while loading
            <p className="text-3xl font-bold text-gray-600">Loading...</p>
          ) : (
            data.map((order, index) => (
              <div key={index} className="mb-8 ">
                {order.email && (
                  <h3 className="text-3xl text-red-500 underline font-bold mb-2">
                    Email: {order.email}
                  </h3>
                )}
                {order.order_data && order.order_data.length > 0 && (
                  <>
                    {order.order_data.map((item, subIndex) => (
                      <div
                        key={subIndex}
                        className="border p-4 flex text-2xl mt-8 flex-wrap items-center bg-gray-300 rounded-xl shadow-xl gap-16 p-8 mb-4"
                      >
                        <h4 className="text-3xl font-bold mb-2 ">
                          Order {subIndex + 1}:
                        </h4>
                        {Object.values(item).length > 0 && (
                          <>
                            {Object.values(item).map((items, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex items-center gap-4 mb-2 transform hover:scale-105 transition-transform duration-300"
                              >
                                {items.img && (
                                  <div className="relative">
                                    <img
                                      src={items.img}
                                      alt={items.name}
                                      className="h-72 w-80 shadow-2xl rounded-2xl "
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                      <p className="text-white font-bold">
                                        {items.name && (
                                          <p className="font-bold text-white text-3xl">
                                            {items.name}
                                          </p>
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                <div className="">
                                  {items.name && (
                                    <p className="font-bold text-red-700 text-3xl">
                                      {items.name}
                                    </p>
                                  )}
                                  {items.price && <p>Price: {items.price}</p>}
                                  {items.qty && <p>Quantity: {items.qty}</p>}
                                  {items.size && <p>Size: {items.size}</p>}
                                </div>
                              </div>
                            ))}
                            {item.Order_date && (
                              <p className="font-medium">
                                Order Date: {item.Order_date}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
