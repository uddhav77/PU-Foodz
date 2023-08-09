import React from "react";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { PiMapPinLineBold } from "react-icons/pi";
import { MdOutlineMail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { CgCopyright } from "react-icons/cg";

const Footer = () => {
  return (
    <>
      <div className="mt-20 bg-cyan-600 text-white  pt-10 pb-10">
        <div className="flex justify-between p-10 pl-32 pr-32">
          <div className="">
            <div className="text-6xl font-bold text-blue-800">
              <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-red-500 relative inline-block">
                <span class="relative text-black">Hunger</span>
              </span>
              Hub
            </div>

            <p className="w-[500px] text-3xl mt-6">
              HungerHub is the new and advanced way of ordering and delivering
              foods to your doorsteps.
            </p>
            <div className="flex pt-4 gap-10 items-center">
              <a href="https://www.facebook.com/search/top?q=codse">
                {<BsFacebook className="text-4xl fill-blue-900" />}
              </a>
              <a href="https://www.instagram.com/codse/">
                {
                  <AiFillInstagram className="text-5xl fill-pink-700 text-orange-400" />
                }
              </a>
              <a href="https://www.twitter.com/your-twitter-profile-url">
                {<BsTwitter className="text-4xl fill-blue-900" />}
              </a>
            </div>
          </div>
          {/* <div className="text-5xl  text-blue-800 font-bold">
            Quick Link
            <ul className="text-3xl text-white mt-4 text-center font-medium">
              <li className="mt-4">Home</li>
              <li className="mt-4">Menu</li>
              <li className="mt-4">My Order</li>
              <li className="mt-4">Contact</li>
            </ul>
          </div> */}

          <div className="text-5xl  text-blue-800 font-bold">
            QUICK LINK
            <ul className="text-3xl mt-4 text-center text-white font-medium ">
              <li className="mt-4 ">
                <Link to="/">Home</Link>
              </li>
              <li className="mt-4">
                <Link to="/menu">Menu</Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="mt-4">
                  <Link to="/order">My Order</Link>
                </li>
              ) : (
                ""
              )}
              <li className="mt-4">
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="text-5xl  text-blue-800 font-bold">
            CONTACT US
            <ul className="text-white text-3xl mt-4  cursor-pointer font-medium">
              <li className="flex gap-4 mt-4">
                {<PiMapPinLineBold />}NewRoad-08,Pokhara
              </li>
              <li className="flex gap-4 mt-4">
                {<MdOutlineMail />}codse@gmail.com
              </li>
              <li className="flex gap-4 mt-4">{<BsTelephone />}9827170622</li>
            </ul>
          </div>
        </div>
        <hr className="" />
        <div className="flex items-center text-3xl mt-6 justify-center gap-2">
          {" "}
          Copyright {<CgCopyright />}2023. All right Reserved by
          <span className="underline cursor-pointer font-medium ">
            {" "}
            <a href="https://codse.com/#/">Codse</a>
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
