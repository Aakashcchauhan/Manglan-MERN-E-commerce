import React, { useState } from "react";
import Slider from "react-slick";
import ReviewCard from "../Cards/ReviewCard";

import video from '../../assets/video/review1.mp4';
import video2 from '../../assets/video/review2.mp4';
import video3 from '../../assets/video/review3.mp4';
import video4 from '../../assets/video/review4.mp4';
import video5 from '../../assets/video/review5.mp4';
import video6 from '../../assets/video/review6.mp4';




export default function Review() {
  const [error, setError] = useState(null);
  const reviews = [
    {
      id: "vid1",
      title: "Best Pants From H&M | H&M Outfit Ideas |",
      url: video,
    },
    {
      id: "vid2",
      title: "H&M Haul: ",
      url: video4,
    },
    {
      id: "vid3",
      title: "Best Pants From H&M | H&M Outfit Ideas |",
      url: video3,
    },
    {
      id: "vid4",
      title: "Best Pants From H&M ",
      url: video2,
    },
    {
      id: "vid5a",
      title: "H&M haul! Summer 2024 fashion ",
      url:  video5,
    },
    {
      id: "vid5b",
      title: "Streetwear Outfit Idea | Streetwear Outfit Inspiration",
      url: video6,
    },
  ];

  const settings = {
    dots: true,
    infinite: reviews.length > 1,
    speed: 500,
    slidesToShow: Math.min(reviews.length, 3),
    slidesToScroll: 1,
    centerMode: reviews.length > 1,
    centerPadding: "30px",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(reviews.length, 2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: Math.min(reviews.length, 1),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(reviews.length, 1),
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-transparent h-[400px] flex justify-center items-center overflow-hidden">
      {error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500 text-center">No reviews available</p>
      ) : (
        <Slider {...settings} className="w-[90%]">
          {reviews.map((review, index) => (
            <div key={index} className="px-10">
              <ReviewCard {...review} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
}
