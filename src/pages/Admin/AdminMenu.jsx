import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import AdimNavBar from "./AdimNavBar";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useRef } from "react";

const AdminMenu = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(4);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef(1);

  const fetchData = async (page, limit) => {
    try {
      const response = await fetch(
        `http://localhost:7000/api/paginatedMenu?page=${page}&limit=${limit}`
      );
      const value = await response.json();
      setPageCount(value.pageCount);
      setData(value.data);
    } catch (err) {
      console.log("Error Occurred", err);
    }
  };

  const handlePageClick = (e) => {
    currentPage.current = e.selected + 1;
    fetchData(currentPage.current, limit);
  };

  useEffect(() => {
    const storedLimit = sessionStorage.getItem("currentLimit");
    if (storedLimit) {
      setLimit(parseInt(storedLimit));
    }

    const storedPage = sessionStorage.getItem("currentPage");
    if (storedPage) {
      currentPage.current = parseInt(storedPage);
    }

    fetchData(currentPage.current, limit);
  }, []);

  const changeLimit = () => {
    currentPage.current = 1;
    sessionStorage.setItem("currentLimit", limit);
    fetchData(currentPage.current, limit);
  };

  useEffect(() => {
    sessionStorage.setItem("currentPage", currentPage.current);
  }, [currentPage.current]);

  const handleDelete = async (id, CategoryName) => {
    if (window.confirm(`Are you sure you want to delete ${CategoryName}?`)) {
      try {
        const response = await fetch(
          `http://localhost:7000/api/foodMenu/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const json = await response.json();

        if (response.ok && json.success) {
          alert("Category Deleted");
          fetchData();
        } else {
          alert("Error Occurred");
        }
      } catch (error) {
        console.error("Error deleting category", error);
      }
    }
  };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col">
        <AdimNavBar />
        <div className="text-5xl font-bold mt-8 underline text-red-500 text-center">
          Food Menu
        </div>
        <div className="flex flex-wrap  justify-center pt-10 ml-10 mr-10 text-3xl gap-16">
          <div></div>
          {data.map((item) => (
            <div
              key={item._id}
              className="bg-gray-300 rounded-lg cursor-pointer shadow-md flex flex-col gap-6 p-4 transition duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={item.img}
                alt={item.name}
                className="h-72 w-96 rounded-2xl"
              />
              <div className="text-3xl font-medium">
                <span className="font-bold text-red-600">Category:</span>{" "}
                {item.CategoryName}
              </div>
              <div className="text-3xl font-medium w-96">
                <span className="font-bold text-red-600 ">Food Name:</span>{" "}
                {item.name}
              </div>
              <div>
                {item.options.map((option, index) => (
                  <div key={index} className="text-3xl font-medium">
                    <span className="font-bold text-red-500">Half:</span>{" "}
                    {option.half} |{" "}
                    <span className="font-bold text-red-600">Full:</span>{" "}
                    {option.full}
                  </div>
                ))}
              </div>
              <div className="text-2xl w-96 ">{item.description}</div>

              <Link to={`/update/${item._id}`} className=" hover:underline">
                <button className="bg-blue-600 text-white p-4 shadow-xl rounded-xl font-bold">
                  Update
                </button>
              </Link>
              {/* <button
                onClick={() => handleDelete(item._id, item.CategoryName)}
                className="p-4 bg-red-500 mt-6 rounded-xl shadow-xl text-white hover:bg-red-600 transition duration-300"
              >
                Delete
              </button> */}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            containerClassName="flex items-center text-3xl justify-center mt-4"
            pageClassName="inline-block mx-1"
            pageLinkClassName="px-3 py-2 rounded-full bg-gray-300 hover:bg-gray-400"
            previousClassName="inline-block mx-1 text-red-500"
            previousLinkClassName="px-3 py-2 rounded-full bg-gray-300 hover:bg-gray-400"
            nextClassName="inline-block mx-1 text-red-500"
            nextLinkClassName="px-3 py-2 rounded-full bg-gray-300 hover:bg-gray-400"
            activeClassName="bg-blue-500 text-white px-3 py-2 rounded-full"
            forcePage={currentPage.current - 1}
          />
          <div className="mt-6 text-center text-3xl">
            <input
              placeholder="Set the limits"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="border rounded p-2 shadow-xl"
            />
            <button
              onClick={changeLimit}
              className="bg-blue-500 text-white shadow-xl px-4 py-2 rounded ml-2"
            >
              Set Limits
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
