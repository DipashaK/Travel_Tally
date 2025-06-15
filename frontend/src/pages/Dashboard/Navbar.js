import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import travelLogo from "../../assets/images/logo.png";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [email, setUserEmail] = useState(null);
  const [profilePic, setProfilePic] = useState(null); // For optional profile picture
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedProfilePic = sessionStorage.getItem("profilePic"); // Assume you may save it in session

    if (storedEmail) {
      setUserEmail(storedEmail);
    }
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("profilePic");
    navigate("/signup");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md text-blue-900 relative z-50">
      <img
        src={travelLogo}
        alt="Travel Planner AI"
        className="h-10 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      />

      <div className="relative" ref={dropdownRef}>
        {profilePic ? (
          <img
            src={profilePic}
            alt="User"
            className="h-10 w-10 rounded-full object-cover cursor-pointer ring-2 ring-blue-500 transition-transform duration-200 hover:scale-105"
            onClick={() => setShowDropdown(!showDropdown)}
          />
        ) : (
          <FaUserCircle
            size={40}
            className="cursor-pointer text-blue-900 hover:text-blue-700 transition-transform duration-300 hover:scale-105"
            onClick={() => setShowDropdown(!showDropdown)}
          />
        )}

        {showDropdown && (
          <div
            className="absolute right-0 mt-3 w-52 bg-white shadow-xl rounded-lg p-3 ring-1 ring-gray-200 transition-all duration-300 transform animate-fade-in-up z-50"
            style={{ animation: "fadeInUp 0.3s ease-out" }}
          >
            {email ? (
              <>
                <p className="text-gray-700 px-2 break-words">{email}</p>
                <hr className="my-2" />
                <button className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md">
                  Settings
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100 rounded-md"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/signup")}
                className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded-md"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
