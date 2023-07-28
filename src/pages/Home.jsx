import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import image from "../assets/images/Food Presentation.jpg";

const Home = () => {
  const slides = [
    {
      url: "https://media.istockphoto.com/photos/paneer-tikka-at-skewers-in-black-bowl-at-dark-slate-background-paneer-picture-id1186759790?k=20&m=1186759790&s=612x612&w=0&h=e9MlX_7cZtq9_-ORGLPNU27VNP6SvDz7s-iwTxrf7wU=",
    },
    {
      url: "https://media.istockphoto.com/photos/spicy-paneer-or-chilli-paneer-or-paneer-tikka-or-cottage-cheese-in-picture-id697316634?b=1&k=20&m=697316634&s=170667a&w=0&h=bctfHdYTz9q2dJUnuxGRDUUwC9UBWjL_oQo5ECVVDAs=",
    },
    {
      url: "https://cdn.pixabay.com/photo/2018/03/23/08/27/thai-fried-rice-3253027__340.jpg",
    },

    {
      url: "https://media.istockphoto.com/photos/chinese-food-veg-pizza-picture-id1341905237?k=20&m=1341905237&s=612x612&w=0&h=Lbuza1Ig5cC1PwQhqTsq-Uac8hg1W-V0Wx4d4lqDeB0=",
    },
    {
      url: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpY2tlbiUyMGZyaWVkJTIwcmljZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
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
      <div className=" h-full bg-red-100 ">
        <div className="flex items-center pt-32">
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
            <div className="mt-20 p-10 flex justify-between">
              <div className="flex flex-col items-center">
                <img
                  src="https://foodmood.com.np/assets/extra-images/how-work-step2.png"
                  alt=""
                  className="w-[200px] h-[200px] "
                />
                <h2 className="font-bold text-4xl mt-8 text-red-500">
                  Choose A Tasty Food
                </h2>
              </div>

              <div className=" flex flex-col items-center">
                <img
                  src="https://foodmood.com.np/assets/extra-images/how-work-step3.png"
                  alt=""
                  className="w-[200px] h-[200px]"
                />
                <h2 className="font-bold text-4xl mt-8 text-red-500">
                  Delivery At Your Home
                </h2>
              </div>
            </div>
          </div>
          <div className="w-[1000px] h-[1000px] m-auto   flex flex-1  group">
            <div
              style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
              className="w-full h-full shadow-2xl bg-center bg-cover duration-500"
            ></div>

            <div>
              <div className="flex top-4 justify-center py-2">
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
        </div>

        <div className="bg-red-600 p-20 ">
          <div className="text-7xl text-white underline decoration-double   font-poppins font-bold flex justify-center ">
            CATEGORIES OF FOOD ITEMS
          </div>
          {/* <img src={image} alt="images" /> */}
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
