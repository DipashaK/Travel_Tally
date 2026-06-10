import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import video1 from "../assets/videos/video1.mp4";
import video2 from "../assets/videos/video2.mp4";
import video3 from "../assets/videos/video3.mp4";

const HeroSection = () => {
  const navigate = useNavigate();
  const videoRefs = useRef([]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    fade: true,
    arrows: false,
   beforeChange: () => {},
    afterChange: (currentIndex) => {
      if (videoRefs.current[currentIndex]) {
        videoRefs.current[currentIndex].play();
      }
    },
  };

  const handleGetStarted = () => {
    const isAuthenticated = sessionStorage.getItem("token");
    navigate(isAuthenticated ? "/dashboard" : "/signup");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Slider {...settings} className="absolute inset-0 w-full h-full">
        {[ video2, video3].map((video, index) => (
          <div key={index} className="h-screen w-full">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={video}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>

      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60"></div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center text-white text-center z-10 px-6">
        <motion.h1
          className="text-6xl font-extrabold tracking-wide font-serif drop-shadow-lg"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          TRAVEL TALLY
        </motion.h1>

        <motion.p
          className="text-xl mt-4 font-medium drop-shadow-md max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Discover the world, one journey at a time.
        </motion.p>

        <motion.button
          onClick={handleGetStarted}
          className="mt-8 px-10 py-4 text-xl font-semibold bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-500 text-white rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-transform duration-300 ease-in-out border-2 border-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          🚀 Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default HeroSection;
