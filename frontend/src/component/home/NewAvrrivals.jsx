import React, { useState, useEffect } from "react";
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
        const response = await fetch(`http://localhost:8080/product/tag/${tag}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products by tag:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
     
    fetchProductsByTag("summer");
  }, []);

  return (
      <>
        <div className="w-full h-auto pb-10 flex flex-col justify-center items-center">
          <div className="max-w-[1500px] w-full h-auto">
            {loading ? (
              <Loader />
            ) : error ? (
              <p>Error: {error}</p>
            ) : products.length === 0 ? (
              <p>No products found</p>
            ) : (
              <div className="grid grid-cols-2 px-6 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 gap-x-16 place-items-center">
                {products.slice(0,8).map((item, index) => (
                  <ShopingCard key={index} item={item} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </>
  );
};

export default Man;
