import React from "react";
import { motion } from "framer-motion";

const CardSection = ({ title, eyebrow, children, innerRef }) => (
  <motion.div
    ref={innerRef}
    className="bg-white p-6 md:p-7 shadow-sm rounded-xl border border-[#1B1B18]/5 mb-6 mt-10 scroll-mt-24"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.4 }}
  >
    {eyebrow && (
      <p className="uppercase tracking-[0.2em] text-[10px] text-[#C99A44] font-semibold mb-1">
        {eyebrow}
      </p>
    )}
    <h3 className="text-xl font-serif text-[#0F3D3E] mb-4">{title}</h3>
    {children}
  </motion.div>
);

export default CardSection;