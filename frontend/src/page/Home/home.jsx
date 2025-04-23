import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../component/navbar";
import HeroSection from "../../component/home/heroSection";
import ReviewCard from "../../component/home/Review";
import NewArrivals from "../../component/home/NewAvrrivals";
import Banner from "../../component/home/banner";
import Categary from "../../component/home/Categary"
import BestCollection from "../../component/home/BestCollection";
import Collection from "../../component/home/Collection";
import Heading from "../../component/other/Heading";
import Carousel from "../../component/home/Carousel";
import Loader from "../../component/other/Loader";
import Footer from "../../component/Footer";


const home = () => {

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
   <>
   {loading ? (<Loader/> ) : 
   (
   <>
        <Navbar />
      <HeroSection />
      <Collection/>
      <Heading heading={"NEW ARRIVALS"} paragraph ={"summer spring '25"}/>
      <NewArrivals  />
      <Banner/>
      <Categary/>
      <Collection/>
      <Heading heading={"Modern Design"} paragraph={"warrior's favorites have made a"}/>
      <Collection/>
      <BestCollection />
      <Carousel/>
      <Heading heading={"Review"} />
      <ReviewCard />
      <Footer/>
    </>
    )}
    </>
  );
};

export default home;
