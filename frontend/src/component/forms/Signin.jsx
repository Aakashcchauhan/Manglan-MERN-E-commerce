import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Loader from "../other/Loader";
export default function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(" authToken");
    if (token) navigate("/");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }
      localStorage.setItem(" authToken", data.token);
      alert("Signup successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-screen bg-gray-900 flex flex-col lg:flex-row justify-center items-center relative overflow-hidden">
          {/* Background container for circles */}
          <div className="w-72 h-72 bg-blue-300 rounded-full blur-3xl absolute top-[-100px] left-[-100px] opacity-50"></div>
          <div className="w-72 h-72 bg-blue-300 rounded-full blur-3xl absolute bottom-[-100px] right-[-100px] opacity-50"></div>

          {/* Content container */}
          <div className="flex flex-col md:flex-row max-w-2xl mx-auto px-6 relative">
            {/* Text Section */}
            <div className="text-white md:w-full flex flex-col text-center md:text-left mb-6 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold">
                The best offer <br />
                <span className="text-blue-300">for your business</span>
              </h1>
              <p className="mt-4 text-gray-300 text-sm md:text-base">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-3/4 lg:w-1/2 mt-10 relative mx-10 lg:mr-15 2xl:mr-[20rem] z-50">
            {error && <p className="text-red-500 text-center">{error}</p>}
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
              Create new account
            </h2>
            <form method="POST" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative w-full md:w-1/2">
                  <input
                    type="text"
                    id="first-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="peer w-full p-3 border rounded-md focus:border-blue-500 outline-none"
                    required
                  />
                  <label
                    htmlFor="first-name"
                    className={`absolute left-3 bg-white px-1 text-sm transition-all ${
                      firstName
                        ? "top-[-10px] text-blue-500 text-xs"
                        : "top-3 text-gray-500"
                    } peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-blue-500 peer-focus:text-xs`}
                  >
                    First Name
                  </label>
                </div>
                <div className="relative w-full md:w-1/2">
                  <input
                    type="text"
                    id="last-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="peer w-full p-3 border rounded-md focus:border-blue-500 outline-none"
                    required
                  />
                  <label
                    htmlFor="last-name"
                    className={`absolute left-3 bg-white px-1 text-sm transition-all ${
                      lastName
                        ? "top-[-10px] text-blue-500 text-xs"
                        : "top-3 text-gray-500"
                    } peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-blue-500 peer-focus:text-xs`}
                  >
                    Last Name
                  </label>
                </div>
              </div>
              <div className="relative mt-3">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full p-3 border rounded-md focus:border-blue-500 outline-none"
                  required
                />
                <label
                  htmlFor="email"
                  className={`absolute left-3 bg-white px-1 text-sm transition-all ${
                    email
                      ? "top-[-10px] text-blue-500 text-xs"
                      : "top-3 text-gray-500"
                  } peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-blue-500 peer-focus:text-xs`}
                >
                  Email Address
                </label>
              </div>
              <div className="relative mt-3">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full p-3 border rounded-md focus:border-blue-500 outline-none"
                  required
                />
                <label
                  htmlFor="password"
                  className={`absolute left-3 bg-white px-1 text-sm transition-all ${
                    password
                      ? "top-[-10px] text-blue-500 text-xs"
                      : "top-3 text-gray-500"
                  } peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-blue-500 peer-focus:text-xs`}
                >
                  Password
                </label>
              </div>
              <div className="flex items-center mt-3">
                <input type="checkbox" id="newsletter" className="mr-2" />
                <label htmlFor="newsletter" className="text-gray-600">
                  Subscribe to our newsletter
                </label>
              </div>
              <button className="w-full mt-4 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
                SIGN UP
              </button>
            </form>

            {/* Social Sign Up */}
            <div className="text-center mt-4">
              <p className="text-gray-600 hover:text-blue-700">
                <Link to="/account/login">Already have an Account </Link>
              </p>
              <p className="text-gray-600">or Log In  with:</p>
              <div className="flex justify-center gap-4 mt-2 text-gray-600">
                <i className="fab fa-facebook cursor-pointer"></i>
                <i className="fab fa-google cursor-pointer"></i>
                <i className="fab fa-twitter cursor-pointer"></i>
                <i className="fab fa-github cursor-pointer"></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
