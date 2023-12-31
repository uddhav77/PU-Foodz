import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <NavBar />
      <div className="pt-44 text-red-500 bg-gray-200 h-full text-6xl text-center">
        <p className="font-cursive font-bold">Contact Us</p>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <div className="mt-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.6178635174024!2d83.98500137467735!3d28.218920502744457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995944c45adf331%3A0x261f392a38f5efdc!2sDurbarthok%20Maarga-2%2C%20Pokhara%2033700!5e0!3m2!1sen!2snp!4v1691129766272!5m2!1sen!2snp"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        )}
        <div className="">
          <div className="h-[1100px] w-[full] mt-20 relative">
            <div
              className="bg-local h-full w-full"
              style={{
                backgroundImage:
                  "url(https://t4.ftcdn.net/jpg/02/70/36/71/240_F_270367156_CW0MpOO2xfl9K0SCmo7iRkSJDlIL6PH9.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="absolute top-0 left-0 text-white p-8 ml-[700px] mt-10 ">
              <form
                action="https://formspree.io/f/xaygqvrb"
                method="POST"
                className="text-3xl p-20 border-2 border-gray-500 pt-8  rounded-2xl shadow-2xl backdrop-blur-md"
              >
                <p className="pt-8 font-bold text-5xl text-red-500">
                  GET IN TOUCH WITH US
                </p>
                <div className="mt-6">
                  <input
                    type="name"
                    placeholder="UserName"
                    name="username"
                    className="p-6 border-b text-3xl shadow-xl rounded-2xl bg-gray-200 w-full focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="mt-8">
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="p-6 border-b text-3xl shadow-xl rounded-2xl bg-gray-200 w-full focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div className="mt-8">
                  <textarea
                    name="message"
                    placeholder="Enter the message"
                    rows="10"
                    className="w-[1000px] p-6 border-b text-3xl shadow-xl rounded-2xl bg-gray-200 focus:outline-none focus:ring focus:border-blue-300"
                  />
                </div>
                <div>
                  <button className="bg-red-500 p-6 mt-4 w-full rounded-xl">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactUs;
