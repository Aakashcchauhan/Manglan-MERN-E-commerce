import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../other/Loader";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lockTime, setLockTime] = useState(0); // Timer for lockout



  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) navigate("/"); // Redirect if already logged in

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [navigate]);

  useEffect(() => {
    if (lockTime > 0) {
      const timer = setInterval(() => {
        setLockTime((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer on unmount
    }
  }, [lockTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.lockTimeRemaining) {
          setLockTime(data.lockTimeRemaining); // Set lockout timer
        }
        throw new Error(data.error || "Login failed");
      }
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user data in localStorage
      localStorage.setItem("authToken", data.token);
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
          {/* Blurred circles */}
          <div className="w-72 h-72 bg-blue-300 rounded-full blur-3xl absolute top-[-100px] left-[-100px] opacity-50"></div>
          <div className="w-72 h-72 bg-blue-300 rounded-full blur-3xl absolute bottom-[-100px] right-[-100px] opacity-50"></div>

          {/* Content container */}
          <div className="flex flex-col md:flex-row max-w-4xl mx-auto px-6 relative">
            {/* Text Section */}
            <div className="text-white md:w-1/2 flex flex-col text-center md:text-left mb-6 md:mb-0">
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
          <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-3/4 lg:w-1/2 mt-10  lg:mr-40 relative z-50 ">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
              Login
            </h2>
            {error && <p className="text-red-500 text-center">{error}</p>}

            <form method="POST" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="relative w-full mt-3 ">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="peer w-full p-3 border rounded-md outline-none focus:border-blue-500 transition-all"
                  disabled={lockTime > 0} // Disable input during lockout
                />
                <label
                  htmlFor="email"
                  className={`absolute left-3 bg-white px-1 text-sm transition-all ${
                    email
                      ? "top-[-10px] text-blue-500 text-xs"
                      : "top-3 text-gray-500"
                  } peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:text-blue-500 peer-focus:text-xs`}
                >
                  Email
                </label>
              </div>

              {/* Password Input */}
              <div className="relative w-full mt-3">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="peer w-full p-3 border rounded-md outline-none focus:border-blue-500 transition-all"
                  disabled={lockTime > 0} // Disable input during lockout
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

              {lockTime > 0 && (
                <p className="text-center text-red-500 mb-4">
                  Try again in {lockTime} seconds.
                </p>
              )}

              <button
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                disabled={lockTime > 0} // Disable button during lockout
              >
                LOGIN
              </button>
            </form>

            <p className="text-center mt-4 text-gray-500">
              Don't have an account?{" "}
              <a
                href="/account/signup"
                className="text-blue-600 hover:underline"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
