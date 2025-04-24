import React from "react";
import { ArrowBigRightDash } from "lucide-react";
import banner from '../../assets/banner1.jpg'

const Banner = () => {
  return (
    <div className="w-full  flex flex-col gap-4 p-4">
      {/* Container for all three images */}
      <div className="w-full flex flex-col gap-4">
        {/* Top banner */}
        <div className="w-full  h-[50%] relative overflow-hidden bg-gray-100">
          <img 
            src={banner} 
            alt="Main Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center ">
                <div className="relative group">
                  <button className="w-40 h-12 bg-white flex justify-center items-center cursor-pointer border border-gray-800 px-4">
                    View More
                    <ArrowBigRightDash size={25} className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                  </button>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></div>
                </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 h-[98] relative overflow-hidden bg-gray-100">
            <img 
              src="https://image.hm.com/content/dam/global_campaigns/season_01/kids/start-page-assets/w-16/4041E-16x9-kids-start-page-prio-week-16.jpg?imwidth=1920" 
              alt="Left Image" 
              className="w-full h-full  object-cover hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="relative group">
                <button className="w-40 h-12 bg-white flex justify-center items-center cursor-pointer border border-gray-800 px-4">
                  View More
                  <ArrowBigRightDash size={25} className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </button>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></div>
              </div>
            </div>
          </div>
         
          {/* Right image */}
          <div className="w-full md:w-1/2 h-[98] relative overflow-hidden bg-gray-100">
            <img 
              src="https://image.hm.com/content/dam/global_campaigns/season_01/men/start-page-assets/w16/start-page/MS21LH9-16x9-Startpage-Teaser-1-Week16.jpg?imwidth=1024" 
              alt="Right Image" 
              className="w-full h-full object-cover  hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="relative group">
                <button className="w-40 h-12 bg-white flex justify-center items-center cursor-pointer border border-gray-800 px-4">
                  View More
                  <ArrowBigRightDash size={25} className="ml-2 transition-transform duration-300 group-hover:translate-x-2" />
                </button>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-black transition-all duration-300 group-hover:w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
