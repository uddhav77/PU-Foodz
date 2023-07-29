import React from "react";
import { AiFillStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

const Reviews = ({ image, titleName, content }) => {
  return (
    <div>
      <div className="bg-white flex flex-col cursor-pointer duration-500 group-hover:blur-sm hover:!blur-none group-hover:scale-[0.85] hover:!scale-100 items-center flex-1 p-14 shadow-2xl rounded-3xl">
        <img src={image} className="w-[200px] h-[200px]" />
        <h1 className="text-4xl text-red-600 font-bold text-center mt-8">
          {titleName}
        </h1>
        <div className="flex mt-4">
          {<AiFillStar className="text-4xl fill-yellow-500" />}
          {<AiFillStar className="text-4xl fill-yellow-500" />}
          {<AiFillStar className="text-4xl fill-yellow-500" />}
          {<AiFillStar className="text-4xl fill-yellow-500" />}
          {<BsStarHalf className="text-4xl fill-yellow-500" />}
        </div>
        <h1 className="text-2xl text-center mt-6">{content} </h1>
      </div>
    </div>
  );
};

export default Reviews;
