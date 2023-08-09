import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Services from "../components/Services";
import Reviews from "../components/Reviews";
import profile from "../assets/images/profile.jpg";
import profile1 from "../assets/images/profile3.jpg";
import profile2 from "../assets/images/profile2.jpg";
import about from "../assets/images/about.jpg";
import Categories from "../components/Categories";
import Footer from "../components/Footer";

const Home = () => {
  const slides = [
    {
      url: "https://img.freepik.com/premium-photo/pot-chicken-curry-with-yellow-plate-food-black-background_854441-41.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph",
    },
    {
      url: "https://img.freepik.com/free-photo/flat-lay-assortment-batch-food-cooked_23-2148765532.jpg?w=2000",
    },
    {
      url: "https://img.freepik.com/free-photo/fruit-salad-spilling-floor-was-mess-vibrant-colors-textures-generative-ai_8829-2895.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph",
    },

    {
      url: "https://img.freepik.com/premium-photo/school-lunch-box-with-tasty-food-stationery-color_392895-248.jpg?w=2000",
    },
    {
      url: "https://img.freepik.com/premium-photo/assorted-indian-recipes-food-various_79295-7226.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph",
    },
    {
      url: "https://img.freepik.com/free-photo/assortment-pieces-cake_114579-30731.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph",
    },
    {
      url: "https://img.freepik.com/free-photo/closeup-shot-deliciously-prepared-chicken-served-with-onions-chili-sauce_181624-61705.jpg?size=626&ext=jpg&ga=GA1.2.179528119.1684068718&semt=sph",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // const prevSlide = () => {
  //   const isFirstSlide = currentIndex === 0;
  //   const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };

  // // const goToSlide = (slideIndex) => {
  // //   setCurrentIndex(slideIndex);
  // // };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  return (
    <>
      <NavBar />
      <div className=" h-full bg-gray-300  ">
        <div className="flex items-center pt-44 justify-center">
          <div className="w-full h-[1000px] m-auto flex flex-1  group">
            <div
              style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
              className="w-full h-full shadow-2xl bg-center bg-cover duration-500"
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
          <div className="absolute top-[900px] text-white text-6xl font-bold font-cursive">
            Think, Choose, Order, Delivered , Eat, Enjoy and Repeat.
          </div>
        </div>

        <div className="bg-cyan-600 p-20 mt-10">
          <div className="text-7xl text-white font-curisve font-bold flex justify-center ">
            POPULAR FOOD DISHES
          </div>
          <Categories />
        </div>
        <div className="p-20 flex mt-28 gap-20 justify-center ">
          <Services
            image="https://www.gonnaorder.com/wp-content/uploads/2021/03/hand_order_1.svg"
            titleName="Easy Order"
            content=" One Click, one order and you get the food delivered. Think,
              Choose, Order, Delivered , Eat, Enjoy and Repeat"
          />
          <Services
            image="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/best-quality-badge-icon.png"
            titleName="Best Quality"
            content=" Straight out of the kitchen to your doorstep. The best service to
              fulfill your expectations"
          />

          <Services
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfwwcKTFBSxNAJHm_bHt9OCkB-1eMc7uJIRw&usqp=CAU"
            titleName="Fastest Delivery"
            content=" Just order and wait for a while. We’ll be there at your door.Good
              food within minutes. Delivering happiness."
          />
        </div>
        <div>
          <div className="text-center p-10">
            <h2 className="text-red-500 text-8xl underline font-bold font-cursive">
              Testimonials
            </h2>
            <h1 className="text-4xl mt-8 font-bold">
              Our Lovely Customers Loves Our Sevices
            </h1>
          </div>
          <div className="p-20 flex mt-4  group gap-20 justify-center ">
            <Reviews
              image={profile}
              titleName="Ava Kaif"
              content="Wow. It is so easy to get my food staying in my home for reasonable price. I am glad that u guys started this,really I was wishing something like this. Cheers."
            />

            <Reviews
              image={profile1}
              titleName="Oliver John"
              content="Delivery in time, Great service, Warm food what else do you need ? The best in town simple as that."
            />

            <Reviews
              image={profile2}
              titleName="John Deo"
              content="I owe you a big time. Thanks in tons god bless your service with loads and loads of opportunities to make your customer happier the way you do. Highly recommended"
            />
          </div>
        </div>
        <div className="h-[600px] w-full relative">
          <div
            className="h-full w-full bg-local"
            style={{
              backgroundImage:
                "url(https://img.freepik.com/free-photo/healthy-food-lunch-boxes-assortment-view_23-2149060403.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(7px)",
            }}
          ></div>

          <div className="absolute top-0 left-0 h-full w-full flex flex-col items-center text-white  p-44 ">
            <div className="text-8xl font-fantasy fold-bold">About Us</div>
            <p className="text-3xl text-center mt-8 ">
              HungerHub is the fastest, easiest and most convenient way to enjoy
              the best food at home, at the office or wherever you want
              to.Foodzz is the new and advanced way of ordering and delivering
              foods to your doorsteps.Our dedicated delivery team ensures your
              food reaches you quickly and reliably.Placing an order with Foodzz
              is as easy as a few taps or clicks. Our intuitive and
              user-friendly interface ensures a seamless ordering process,
              saving you time and effort. Our mission is to make food ordering a
              delightful and convenient experience for foodies like you!
            </p>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
