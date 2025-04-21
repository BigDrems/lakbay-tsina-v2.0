import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import FlipText from "./FlipText";
import { fadeIn } from "../utils/variants";

const heading =
  "Educational website that explores the rich history, culture, and dynasties of China.";
const subHeading =
  "It provides interactive learning experiences, historical insights, and multimedia content to enhance users' understanding of China's heritage.";

export default function ParallaxScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity }}
      className="w-screen min-h-screen overflow-hidden flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between inset-0 bg-white px-6 md:px-12 lg:px-16"
    >
      {/* Text Section */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
        className="font-bold w-[85vw] text-white backdrop-blur-3xl p-6 lg:p-10 flex flex-col items-start justify-start rounded-md md:w-3/4 lg:w-2/5"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <FlipText className="text-xl md:text-2xl lg:text-7xl">About</FlipText>
        </motion.div>
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FlipText className="text-7xl md:text-6xl lg:text-9xl">
            Lakbay
          </FlipText>
          <FlipText className="text-3xl md:text-5xl lg:text-9xl">
            Tsina
          </FlipText>
        </motion.div>
        <motion.p
          className="text-sm md:text-lg lg:text-2xl pt-4 md:pt-10 lg:pt-10 font-normal text-black capitalize w-full text-start leading-6 tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {heading}
        </motion.p>
        <motion.p
          className="text-xs md:text-base lg:text-1xl pt-4 lg:pt-5 font-normal text-black/80 capitalize w-full text-start leading-6 tracking-widest"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {subHeading}
        </motion.p>
      </motion.div>
      {/* Image & Title Section */}
      <motion.div
        style={{ y }}
        className="flex flex-col items-start gap-3 justify-between lg:flex-row lg:justify-center lg:items-center w-full md:w-3/4 lg:w-1/2"
      >
        <div className="flex flex-col w-full items-start mt-15 lg:mt-0 lg:w-auto">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            src="/images/bg-1.png"
            alt="China Scene"
            className="w-full h-[50vh] md:h-[60vh] lg:h-[80vh] md:w-full lg:w-[45vw] object-cover rounded-md"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
