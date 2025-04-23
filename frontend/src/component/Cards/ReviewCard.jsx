import React from "react";

const ReviewCard = ({ url, title }) => {
  const isVideo = url.endsWith(".mp4") || url.startsWith("blob:");

  return (
    <div className="relative w-[250px] lg:w-[250px] h-[350px] rounded-3xl overflow-hidden shadow-lg bg-amber-50 mt-5 group">
      {/* Media Content */}
      {isVideo ? (
        <video
          src={url}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={"https://via.placeholder.com/250x350?text=No+Preview"}
          alt={title}
          className="w-full h-full object-cover"
        />
      )}

      {/* Overlay with transition */}
      <div className="absolute inset-0 cursor-pointer bg-black/30 group-hover:bg-transparent transition-all duration-500"></div>

      {/* Text Content with fade/slide-in effect */}
      <div className="absolute bottom-5 left-5 text-white transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-0">
        <h2 className="text-lg font-bold">{title}</h2>
      </div>
    </div>
  );
};

export default ReviewCard;
