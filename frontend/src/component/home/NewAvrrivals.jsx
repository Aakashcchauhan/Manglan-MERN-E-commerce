import React, { useState, useEffect } from "react";
import axios from "axios";
import Heading from "../../component/other/Heading";
import ShopingCard from "../../component/Cards/ShopingCard";
import Loader from "../../component/other/Loader";
import Navbar from "../../component/navbar";

const Man = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProductsByTag = async (tag) => {
      try {
        setLoading(true);
        const response = await axios.get(`https://manglan-clothing-backend.onrender.com/product/tag/${tag}`);
        // Axios automatically parses JSON, so we just need to access the data property
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products by tag:", err.response?.data?.message || err.message);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
     
    fetchProductsByTag("summer");
  }, []);
  
  return (
    <>
      <div className="w-full h-auto pb-10 flex flex-col justify-center items-center bg-amber-200">
        <div className="max-w-[2000px] w-full h-auto mx-2">
            <div className="grid grid-cols-1 px-6 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 gap-x-16 place-items-center">
              {products.slice(0,8).map((item, index) => (
                <ShopingCard key={index} item={item} index={index} />
              ))}
            </div>
        </div>
      </div>
    </>
  );
};

export default Man;
