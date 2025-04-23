import { useLocation } from "react-router-dom";
import BestCollection from "../component/home/BestCollection";
import { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Loader from "../component/other/Loader";

const Detailed = () => {
  const location = useLocation();
  const { 
    name, 
    cost, 
    desc, 
    image, 
    sizes, 
    colors, 
    category, 
    stock, 
    rating 
  } = location.state || {};
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <Loader /> 
      ) : (
        <>
          <Navbar />
          <BestCollection 
            names={name} 
            cost={cost} 
            desc={desc} 
            rating={rating} 
            image={image}
            sizes={sizes}
            colors={colors}
            category={category}
            stock={stock}
          />
        </>
      )}
    </>
  );
};

export default Detailed;