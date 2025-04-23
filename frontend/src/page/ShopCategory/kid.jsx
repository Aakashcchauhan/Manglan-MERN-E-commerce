import React, { useState, useEffect } from "react";
import Heading from "../../component/other/Heading";
import ShopingCard from "../../component/Cards/ShopingCard";
import Loader from "../../component/other/Loader";
import Navbar from "../../component/navbar";

const Man = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [visibleItems, setVisibleItems] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        setLoading(true);
        const url = `http://localhost:8080/product/all?page=${page}&category=Kid&limit=10`;
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

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 100) {
        setVisibleItems((prev) => Math.min(prev + 4, products.length));
      }
    };

    const debounceScroll = () => {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(handleScroll, 100);
      };
    };

    const debouncedHandleScroll = debounceScroll();
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, [page, products.length]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Heading heading={"Kid Category"} paragraph={"Fashion '25"} />
          <div className="w-full h-auto pb-10 flex flex-col justify-center items-center">
            <div className="max-w-[1500px] w-full h-auto">
              <div className="grid grid-cols-2 px-6 pt-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-10 gap-x-16 place-items-center">
                {products.slice(0, visibleItems).map((item, index) => (
                  <ShopingCard key={index} item={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Man;
