import React from "react";

const Services = ({ image, titleName }) => {
  return (
    <div>
      <img src={image} className="w-[200px] h-[200px]" />
      <h1 className="text-4xl text-red-600 font-bold text-center mt-8">
        {titleName}
      </h1>
    </div>
  );
};

export default Services;
