import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // Import the styles for the circular progress bar
import "tailwindcss/tailwind.css"; // Import the Tailwind CSS styles

const ProgressBar = () => {
  return (
    <div className="flex flex-col items-center bg-gray-400 rounded-xl backdrop-blur-md bg-white/30 shadow-2xl p-10">
      <div className="text-3xl text-red-600 font-bold mb-2">
        Total Progress Of Website
      </div>
      <div className="w-80 mt-6 ">
        <CircularProgressbar
          value="70"
          text={"70%"}
          styles={{
            root: {},
            path: {
              // Customize the path color
              stroke: "#4F46E5",
              // Customize the path transition
              transition: "stroke-dashoffset 0.5s ease 0s",
            },
            trail: {
              // Customize the trail color
              stroke: "#D1D5DB",
            },
            text: {
              // Customize the text color
              fill: "#4F46E5",
              // Customize the text font size
              fontSize: "16px",
              // Customize the text transition
              transition: "fill 0.5s ease 0s",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
