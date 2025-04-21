import React from "react";
import Carousel from "../components/Carousel";
import EducatorsCarousel from "../components/EducatorsCarousel";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const Tungkol = () => {
  return (
    <motion.div
      className="flex flex-col items-center w-full min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="w-full h-screen relative">
        <Carousel />
      </div>

      <EducatorsCarousel />
    </motion.div>
  );
};

export default Tungkol;
