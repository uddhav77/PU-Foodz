import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import image from "../assets/images/Food Presentation.jpg";

const Home = () => {
  const slides = [
    {
      url: "https://img.freepik.com/premium-photo/food-with-delivery-set-dishes-diet-top-view-free-space-your-text-black-background_187166-25369.jpg",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3FFDpLjsk9k6rzoVGgg6Alg5ICw4jVP24P_Pm7y4a9kvqaB9QXia0WX2ZycUYJ1JPA10&usqp=CAU",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTXyvucHn17KM30zD-E07YOnzTSpkyTJZNQOQXnFUR65yTqll6aqeyFHB0PIpk2QzWGE&usqp=CAU",
    },

    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw1bS_yZMPviEiRDI9n8cH9bK3wDSk4-jsPUGWS6-areT5H2l-7qeyUYFqpF7X5O2KVH4&usqp=CAU",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSupNIWPzGa66Pqv2nU5QKRBU04ko2GwVbLlS6rqsdyxVaHxV_65cH82VYjlrTGbDrlia0&usqp=CAU",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
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
      <div className=" h-screen bg-red-200 ">
        <div className="flex  items-center p-20">
          <div className="p-8 ">
            <h1 className="font-bold text-8xl font-fantasy text-red-600 ">
              Satisfy your craving with us
            </h1>
            <div className="pt-14 flex">
              <input
                className="p-8 border-b border-b-red -800 text-3xl  rounded-ss-2xl rounded-es-2xl  shadow-2xl w-full "
                placeholder="Search....."
              />
              <div>
                <button className="p-8 bg-red-600  rounded-ee-2xl rounded-se-2xl shadow-2xl text-3xl text-white">
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="w-[1000px] h-[800px] m-auto   flex flex-1 mt-44 group">
            <div
              style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
              className="w-full h-full rounded-2xl  shadow-2xl bg-center bg-cover duration-500"
            ></div>

            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>

            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>

            <div className="flex top-4 justify-center py-2">
              {slides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className={`text-2xl cursor-pointer ${
                    slideIndex === currentIndex ? "text-red-500" : "text-black"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-red-600 p-20">
          <div className="text-7xl text-white underline decoration-double   font-poppins font-bold flex justify-center ">
            CATEGORIES OF FOOD ITEMS
          </div>
          <img src={image} alt="images" />
        </div>
      </div>
    </>
  );
};

export default Home;

// import React from "react";
// import NavBar from "../components/NavBar";
// import image from "../assets/images/home.jpg";

// const Home = () => {
//   return (
//     <>
//       <div>
//         <NavBar />
//       </div>
//       <div className="p-20 relative">
//         <div className="w-[2430px] h-[1000px] relative">
//           <img
//             src={image}
//             alt="image"
//             className="w-full h-full rounded-xl shadow-xl "
//           />
//           <div className="absolute top-0 p-8">
//             <h1 className="font-bold text-8xl font-fantasy text-white mt-44">
//               Satisfy your craving with us
//             </h1>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
