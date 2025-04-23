import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import PriceCard from "../../component/Cards/PriceCard";

export default function Collection() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
 
    useEffect(() => {
      const fetchMenProducts = async () => {
        try {
          setLoading(true);
          const url = `http://localhost:8080/product/all?page=1&category=Luxury&limit=10`;
          const response = await fetch(url);
          const contentType = response.headers.get("content-type");
 
          if (!response.ok) throw new Error("Failed to fetch products");
 
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            setProducts(data.products);
            setTotalPages(Math.ceil(data.total / 10));
          } else {
            throw new Error("Invalid JSON response");
          }
        } catch (err) {
          setError(err.message);
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
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Slider {...settings} className="w-[90%]">
            {products.map((product, index) => (
              <div key={index} className="px-10">
                <PriceCard {...product} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
}