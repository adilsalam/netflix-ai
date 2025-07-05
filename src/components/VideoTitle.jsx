import React from "react";

const VideoTitle = ({ title, description }) => {
  return (
    <div className="pt-[15%] px-24 w-full aspect-video absolute text-white bg-gradient-to-r from-black">
      <p className="text-2xl md:text-4xl font-bold">{title}</p>
      <p className="hidden md:block w-1/3 text-lg py-10">{description}</p>
      <div>
        <button className="my-4 md:m-0 bg-white text-md text-black w-32 py-3 rounded-md cursor-pointer hover:bg-white/80">
          Play
        </button>
        <button className="hidden md:inline-block bg-gray-400 text-md w-32 py-3 rounded-md mx-3 cursor-pointer hover:bg-gray-400/80">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
