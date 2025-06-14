import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import travelLogo from "../../assets/images/logo.png";
import defaultUserPic from "../../assets/images/logo.png";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [email, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    navigate("/signup");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md text-blue-900">
      <img
        src={travelLogo}
        alt="Travel Planner AI"
        className="h-10 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      />

      <div className="relative">
        <img
          src={defaultUserPic}
          alt="User"
          className="h-10 w-10 rounded-full cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        />
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md p-2">
            {email ? (
              <>
                <p className="text-gray-700 px-2">{email}</p>
                <hr className="my-2" />
                <button className="w-full text-left px-2 py-1 hover:bg-gray-200">Settings</button>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-2 py-1 text-red-600 hover:bg-gray-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button onClick={() => navigate("/signup")} className="w-full text-left px-2 py-1 hover:bg-gray-200">
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
