import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
const BackButton = () => {
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      navigate(-1); // Go back
    } else if (event.key === "ArrowRight") {
      navigate(1); // Go forward
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
    <div className="w-full  flex flex-row justify-between px-5 ">
    <button  onClick={() => navigate(-1)} style={styles.button}>
    <ArrowBigLeftDash />
    </button>
    <button  onClick={() => navigate(+1)} style={styles.button}>
    <ArrowBigRightDash />
  </button>
  </div>
  </>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "gray",
    color: "white",
  },
};

export default BackButton;
