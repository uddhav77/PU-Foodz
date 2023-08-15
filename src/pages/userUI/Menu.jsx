import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { BsSearch } from "react-icons/bs";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:7000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setItems(data[0]);
      setFoodCat(data[1]);
    };
    fetchData();
  }, []);
  const slides = [
    {
      url: "https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph",
    },
    {
      url: "https://img.freepik.com/free-photo/gourmet-chicken-biryani-with-steamed-basmati-rice-generated-by-ai_188544-13480.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph",
    },
    {
      url: "https://img.freepik.com/free-photo/front-view-donuts-with-chocolate-colorful-candies-brown-desk-grey_140725-13134.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph",
    },
    {
      url: "https://img.freepik.com/premium-photo/chicken-biriyani-using-jeera-rice-arranged-earthenware-with-raitha-grey-background_527904-8.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph",
    },

    {
      url: "https://img.freepik.com/premium-photo/bowl-chocolate-cookies-with-spoon-it_779834-3044.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph",
    },
    {
      url: "https://img.freepik.com/free-photo/food-mix-salad-noodles-grillea-chicken-garlic-greena-top-view_141793-15488.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=ais",
    },
    {
      url: "https://img.freepik.com/free-photo/closeup-shot-deliciously-prepared-chicken-served-with-onions-chili-sauce_181624-61705.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph",
    },
    {
      url: "https://img.freepik.com/free-photo/top-view-meals-tasty-yummy-different-pastries-dishes-brown-surface_140725-14554.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <>
      <NavBar />

      <div className="pt-52 ">
        <div className="flex items-center justify-center">
          <div className="w-full h-[600px]  m-auto flex flex-1  group">
            <div
              style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
              className="w-full h-full shadow-2xl  bg-center bg-cover duration-500"
            ></div>

            <div>
              <div className="flex top-4 justify-center relative py-2">
                {slides.map((slide, slideIndex) => (
                  <div
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className={`text-2xl cursor-pointer ${
                      slideIndex === currentIndex
                        ? "text-red-500"
                        : "text-black"
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute text-white text-6xl font-bold font-cursive">
            <input
              className="p-8 text-3xl hover:shadow-2xl rounded-2xl rounded-xl backdrop-blur-sm bg-white/90 relative w-[2000px] text-black focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Search For Your Favourite Food....."
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {foodCat.length !== 0 ? (
          foodCat.map((data) => (
            <div
              key={data._id}
              className="text-red-400 font-bold flex flex-wrap justify-center text-5xl mt-10"
            >
              <div className="underline text-6xl mt-8">{data.CategoryName}</div>
              <hr />
              <div className="flex flex-wrap justify-center">
                {items.length !== 0 ? (
                  items
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => (
                      <div
                        key={filterItems._id}
                        className="flex justify-center"
                      >
                        <Link to={`/detail/${filterItems._id}`}>
                          <div className="text-red-500 text-3xl font-bold bg-white ml-16 mt-20 relative rounded-2xl shadow-2xl hover:scale-110 hover:duration-300">
                            <div>
                              <img
                                src={filterItems.img}
                                alt={filterItems.name}
                                className="w-[500px] relative h-[350px] shadow-2xl rounded-2xl"
                              />
                            </div>
                            <div className="text-center mt-8 bg-red-400 text-white p-2 w-[250px] absolute top-0 right-0">
                              {filterItems.name}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                ) : (
                  <div>No Food Items Found</div>
                )}
                <div className="">
                  {items.length !== 0 &&
                    items.filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    ).length === 0 && (
                      <div className="text-black text-3xl mt-44">
                        Food Not Found
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No Food Categories Available</div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Menu;
