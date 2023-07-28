import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

import Services from "../components/Services";
import Reviews from "../components/Reviews";
import profile from "../assets/images/profile.jpg";
import profile1 from "../assets/images/profile3.jpg";
import profile2 from "../assets/images/profile2.jpg";

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
      <div className=" h-full bg-gray-300 ">
        <div className="flex items-center pt-32">
          <div className="p-8 ">
            <h1 className="font-bold text-7xl font-cursive text-red-500 ">
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

        <div className="bg-cyan-600 p-20 ">
          <div className="text-7xl text-white font-curisve font-bold flex justify-center ">
            CATEGORIES OF FOOD ITEMS
          </div>
          {/* <img src={image} alt="images" /> */}
        </div>
        <div className="p-20 flex mt-28 gap-20 justify-center ">
          <div className="bg-white flex flex-col items-center flex-1 p-14 shadow-2xl rounded-3xl">
            <Services
              image="https://www.gonnaorder.com/wp-content/uploads/2021/03/hand_order_1.svg"
              titleName="Easy Order"
            />
            <h1 className="text-2xl text-center mt-6">
              One Click, one order and you get the food delivered. Think,
              Choose, Order, Delivered , Eat, Enjoy and Repeat
            </h1>
          </div>
          <div className="bg-white flex flex-col items-center  shadow-2xl flex-1 rounded-3xl p-14">
            <Services
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfwwcKTFBSxNAJHm_bHt9OCkB-1eMc7uJIRw&usqp=CAU"
              titleName="Fastest Delivery"
            />
            <h1 className="text-2xl text-center mt-6">
              Just order and wait for a while. We’ll be there at your door.Good
              food within minutes. Delivering happiness.
            </h1>
          </div>
          <div className="bg-white  flex flex-col items-center shadow-2xl flex-1 rounded-3xl p-14">
            <Services
              image="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/best-quality-badge-icon.png"
              titleName="Best Quality"
            />
            <h1 className="text-2xl text-center mt-6">
              Straight out of the kitchen to your doorstep. The best service to
              fulfill your expectations
            </h1>
          </div>
        </div>
        <div>
          <div className="text-center p-10">
            <h2 className="text-red-500 text-4xl"> Testimonials</h2>
            <h1 className="text-3xl">Read What Other Have to Say</h1>
          </div>
          <div className="p-20 flex mt-28 group gap-20 justify-center ">
            <div className="bg-white flex duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 flex-col items-center flex-1 p-14 shadow-2xl rounded-3xl">
              <Reviews image={profile} titleName="Fastest Delivery" />
              <h1 className="text-2xl text-center mt-6">
                One Click, one order and you get the food delivered. Think,
                Choose, Order, Delivered , Eat, Enjoy and Repeat
              </h1>
            </div>
            <div className="bg-white flex flex-col  items-center duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 shadow-2xl flex-1 rounded-3xl p-14">
              <Reviews image={profile1} titleName="Fastest Delivery" />
              <h1 className="text-2xl text-center mt-6">
                Just order and wait for a while. We’ll be there at your
                door.Good food within minutes. Delivering happiness.
              </h1>
            </div>
            <div className="bg-white  flex flex-col items-center duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 shadow-2xl flex-1 rounded-3xl p-14">
              <Reviews image={profile2} titleName="Best Quality" />
              <h1 className="text-2xl text-center mt-6">
                Straight out of the kitchen to your doorstep. The best service
                to fulfill your expectations
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
