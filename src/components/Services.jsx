import React from "react";

const Services = ({ image, titleName, content }) => {
  return (
    <div>
      <div className="bg-white flex flex-col cursor-pointer  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500 duration-300 items-center flex-1 p-14 shadow-2xl rounded-3xl">
        <img src={image} className="w-[200px] h-[200px]" />
        <h1 className="text-4xl text-red-500 font-bold text-center mt-8">
          {titleName}
        </h1>
        <h1 className="text-2xl text-center mt-6">{content} </h1>
      </div>
    </div>
  );
};

export default Services;
