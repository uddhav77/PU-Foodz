import React, { useEffect, useRef, useState } from "react";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";
import ReactPaginate from "react-paginate";
import "tailwindcss/tailwind.css";

const OrderInfo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [limit, setLimit] = useState(1);
  const [pageCount, setCountPage] = useState(1);
  const currentPage = useRef();

  useEffect(() => {
    const storedPage = sessionStorage.getItem("currentPage");
    const storedLimit = sessionStorage.getItem("currentLimit");

    currentPage.current = storedPage ? parseInt(storedPage) : 1;
    setLimit(storedLimit || 1);

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:7000/api/paginatedUser?page=${currentPage.current}&limit=${limit}`,
        {
          method: "GET",
        }
      );
      const value = await response.json();
      console.log(value);
      setCountPage(value.pageCount);
      setData(value.result);
      setLoading(false);
    } catch (err) {
      console.log("Error Occurred", err);
      setLoading(false);
    }
  };

  const handlePageClick = (e) => {
    console.log(e);
    currentPage.current = e.selected + 1;
    sessionStorage.setItem("currentPage", currentPage.current);
    fetchData();
  };

  const changeLimit = () => {
    currentPage.current = 1;
    sessionStorage.setItem("currentLimit", limit);
    fetchData();
  };

  return (
    <div className="flex">
      <div className="">
        <SideBar />
      </div>
      <div className="">
        <AdimNavBar />
        <div className="p-8">
          {loading ? (
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
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="flex items-center text-3xl justify-center mt-4" // Apply Tailwind classes
          pageClassName="inline-block mx-1"
          pageLinkClassName="px-3 py-2 rounded-full bg-gray-300 hover:bg-gray-400"
          previousClassName="inline-block mx-1"
          previousLinkClassName="px-3 py-2 rounded-full bg-gray-300 hover:bg-gray-400"
          nextClassName="inline-block mx-1"
          nextLinkClassName="px-3 py-2 rounded-full bg-gray-300 hover:bg-gray-400"
          activeClassName="bg-blue-500 text-white px-3 py-2 rounded-full"
          forcePage={currentPage.current - 1}
        />
        <div className="mt-6 text-center text-3xl">
          <input
            placeholder="Set the limits"
            onChange={(e) => setLimit(e.target.value)}
            className="border rounded p-2"
          />
          <button
            onClick={changeLimit}
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          >
            Set Limits
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
