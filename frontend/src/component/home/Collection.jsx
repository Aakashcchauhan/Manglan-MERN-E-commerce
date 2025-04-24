import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import PriceCard from "../../component/Cards/PriceCard";

export default function Collection() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
 
    useEffect(() => {
      const fetchMenProducts = async () => {
        try {
          setLoading(true);
          const url = `https://manglan-clothing-backend.onrender.com/product/all?page=1&category=Luxury&limit=10`;
          const response = await axios.get(url);
          
          // With axios, we don't need to check content-type or call .json()
          // Data is automatically parsed
          setProducts(response.data.products);
          setTotalPages(Math.ceil(response.data.total / 10));
        } catch (err) {
          setError(err.response?.data?.message || err.message);
        } finally {
          setLoading(false);
        }
      };
 
      fetchMenProducts();
    }, [page]); // Added page as dependency
   
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "30px",
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
    
  return (
    <>  
      <div className="bg-transparent h-[400px] flex justify-center items-center mt-10">
          <Slider {...settings} className="w-[90%]">
            {products.map((product, index) => (
              <div key={index} className="px-10">
                <PriceCard {...product} />
              </div>
            ))}
          </Slider>
      </div>
    </>
  );
}
