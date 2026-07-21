import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import travelLogo from "../../assets/images/logo.png";
import { FaUserCircle } from "react-icons/fa";
import "../../index.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [email, setUserEmail] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    const storedProfilePic = sessionStorage.getItem("profilePic");

    if (storedEmail) setUserEmail(storedEmail);
    if (storedProfilePic) setProfilePic(storedProfilePic);

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
    <header className="flex justify-between items-center px-6 py-3 bg-white/90 backdrop-blur-sm shadow-[0_2px_0_0_var(--tt-gold)] text-[var(--tt-ink)] relative z-50">
      <div className="flex items-center gap-3">
        <img
          src={travelLogo}
          alt="Travel Planner AI"
          className="h-10 cursor-pointer transition-transform duration-300 hover:scale-105 hover:-rotate-2"
          onClick={() => navigate("/dashboard")}
        />
        <span className="hidden sm:inline-block font-mono-tt text-[10px] tracking-[0.25em] uppercase text-[var(--tt-sage)]">
          Gate&nbsp;01 · Boarding
        </span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          className="stamp-hover relative rounded-full"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {profilePic ? (
            <img
              src={profilePic}
              alt="User"
              className="stamp-badge h-10 w-10 rounded-full object-cover cursor-pointer ring-2 ring-[var(--tt-teal)] transition-transform duration-200 hover:scale-105"
            />
          ) : (
            <FaUserCircle
              size={40}
              className="stamp-badge cursor-pointer text-[var(--tt-teal)] hover:text-[var(--tt-coral)] transition-all duration-300 hover:scale-105"
            />
          )}
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-xl ring-1 ring-[var(--tt-sage)]/30 z-50 overflow-hidden animate-dropdown-in origin-top-right">
            {/* perforated header strip */}
            <div className="bg-[var(--tt-teal)] px-4 py-2 flex items-center justify-between">
              <span className="font-mono-tt text-[10px] tracking-[0.2em] text-white/80 uppercase">
                Passenger
              </span>
              <span className="font-mono-tt text-[10px] text-[var(--tt-gold)]">TT‑01</span>
            </div>

            <div className="p-3">
              {email ? (
                <>
                  <p className="text-[var(--tt-ink)] px-1 break-words text-sm">{email}</p>
                  <hr className="my-2 border-dashed border-[var(--tt-sage)]/50" />
                  <button className="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-[var(--tt-paper)] transition-colors">
                    Settings
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-2 py-1.5 rounded-md text-sm text-[var(--tt-coral)] hover:bg-[var(--tt-paper)] transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/signup")}
                  className="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-[var(--tt-paper)] transition-colors"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;