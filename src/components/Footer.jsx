import React from "react";
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <div className="mt-20 bg-cyan-600 text-white p-10 pt-20">
        <div className="flex">
          <div className="">
            <div className="text-6xl font-bold">
              <span className="text-blue-900">Hunger</span>Hub
            </div>

            <p className="w-[700px] text-3xl mt-6">
              Foodzz is the new and advanced way of ordering and delivering
              foods to your doorsteps.
            </p>
            <div className="flex pt-4 gap-10 items-center">
              <span>{<BsFacebook className="text-4xl fill-blue-900" />}</span>
              <span>
                {
                  <AiFillInstagram className="text-5xl fill-pink-700 text-orange-400" />
                }
              </span>
              <span>{<BsTwitter className="text-4xl fill-blue-900" />}</span>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Footer;
