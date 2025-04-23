import React from "react";
import "../../Loader.css";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center  ">
    <div className="relative w-[96px] h-[96px] rotate-45 ">
      {[...Array(7)].map((_, i) => (
        <div key={i} className={`loader-square`} style={{ animationDelay: `-${i * 1.4285714286}s` }}></div>
      ))}
    </div></div>
  );
};

export default Loader;
