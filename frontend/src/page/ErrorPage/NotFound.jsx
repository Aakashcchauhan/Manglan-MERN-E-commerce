import React from "react";
import { Flag } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className=" w-full h-screen flex flex-col justify-center items-center gap-4">
        <div className="flex" >
          <Flag size={100} />
          <h1 className="text-6xl font-extrabold pt-10">Error 404</h1>
        </div>
        <h3 className=" text-4xl">It looks like something went wrong.</h3>
        <p className="text-2xl text-center p-5 text-gray-500">
          Don't worry, our team is already on it.Please try refreshing the page
          or come back later.
        </p>
        <button onClick={console.log("asda")} className="text-white rounded-md bg-gray-900 w-98 h-10 cursor-pointer hover:bg-blue-500">
         <Link to={"/"} >Back Home</Link> 
        </button>
      </div>
    </>
  );
};

export default NotFound;
