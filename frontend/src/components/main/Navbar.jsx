import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Check login status
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="absolute top-0 left-0 w-full flex items-center justify-between bg-transparent px-6 sm:px-10 py-4 sm:py-6 shadow-md z-50">
      {/* Logo */}
      <img 
        src={logo} 
        alt="Logo" 
        className="h-16 sm:h-20 cursor-pointer" 
        onClick={() => navigate("/")} 
      />

      {/* Right Side */}
      <div className="flex space-x-4 sm:space-x-6 relative">
        {!isLoggedIn ? (
          <>
            <button
  className="px-6 sm:px-8 py-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition duration-300"

              onClick={() => navigate("/login")}
              style={{ pointerEvents: "auto", position: "relative", zIndex: 100 }}
            >
              Login
            </button>
            <button
  className="px-4 sm:px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transition duration-300"

              onClick={() => navigate("/signup")}
              style={{ pointerEvents: "auto", position: "relative", zIndex: 100 }}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-2xl sm:text-3xl text-white hover:text-gray-300 transition"
            >
              <FaUserCircle />
            </button>

            {/* Dropdown with Slide + Fade + Scale animation */}
            <div
              ref={dropdownRef}
              className={`absolute right-0 mt-12 bg-white shadow-lg rounded-lg p-4 z-50 transform transition-all duration-300 origin-top w-48 sm:w-56
                ${showDropdown ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2 pointer-events-none"}
              `}
            >
              <p className="text-black mb-2 break-words">Email : {userEmail}</p>
              <button
                className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
