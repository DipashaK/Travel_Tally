import React from "react";
import { motion } from "framer-motion";

const CardSection = ({ title, children, innerRef }) => (
  <motion.div
    ref={innerRef}
    className="bg-white p-6 shadow-md rounded-lg mb-6 mt-12"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <h3 className="text-xl font-semibold text-blue-700 mb-2">{title}</h3>
    {children}
  </motion.div>
);

export default CardSection;