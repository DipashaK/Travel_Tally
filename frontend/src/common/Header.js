import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleUserClick = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const email = sessionStorage.getItem("email") || "Guest";

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-gray-100 shadow-md z-50 flex items-center justify-between px-4">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="text-blue-500 text-2xl">📍</div>
          <h1 className="font-bold text-xl">
            Travel <span className="text-blue-500">Tally</span>
          </h1>
        </div>
        <nav className="flex items-center space-x-6 text-lg font-medium text-gray-800">
          <Link to="/dashboard" className="hover:text-blue-500">
            Dashboard
          </Link>
          <a href="#" className="hover:text-blue-500">
            Community Plans
          </a>
        </nav>
      </div>
      <div className="flex items-center space-x-6 relative">
        <div className="text-lg font-medium">Credits 1</div>
        <div
          className="flex items-center space-x-2 relative"
          ref={dropdownRef}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/194/194938.png"
            alt="avatar2"
            className="w-8 h-8 rounded-full cursor-pointer"
            onClick={handleUserClick}
          />
          {showDropdown && (
            <div className="absolute top-12 -left-1/2 transform -translate-x-1/2 w-48 bg-white border rounded-lg shadow-lg py-2 z-10">
              <div className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 cursor-pointer">
                👤 {email}
              </div>
              <hr />
              <button
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={() => {
                  localStorage.removeItem("email");
                  navigate("/signup");
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
