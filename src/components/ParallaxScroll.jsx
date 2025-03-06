import { motion } from "framer-motion";
import React from "react";
import FlipText from "./FlipText";
import { fadeIn } from "../utilities/variants";

const heading =
  "Educational website that explores the rich history, culture, and dynasties of China.";
const subHeading =
  "It provides interactive learning experiences, historical insights, and multimedia content to enhance users' understanding of China's heritage.";

export default function ParallaxScroll() {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)} // Animates the whole section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }} // Appears when 50% visible
      className="w-full min-h-screen overflow-hidden relative flex flex-col lg:flex-row items-center justify-center bg-white px-4 lg:px-0"
    >
      {/* Image & Title Section */}
      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.5 }}
        className="flex flex-col lg:flex-row justify-center gap-3 items-center w-full lg:w-1/2 relative z-30 p-4 lg:p-10"
      >
        <div className="flex flex-col w-full lg:w-auto">
          <motion.img
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
            src="/images/qin.webp"
            alt="China Scene"
            className="h-[30vh] lg:h-[48vh] w-full lg:w-[20vw] object-cover"
          />
          <div className="w-full lg:w-[20vw] h-[10vh] lg:h-[14vh] bg-[#cd201c] flex items-center justify-center mt-4">
            <h3 className="text-xl lg:text-3xl text-white">Experience China</h3>
          </div>
        </div>
        <div className="hidden lg:flex flex-col pb-18">
          <div className="w-[20vw] h-[25vh] bg-white flex items-center justify-center"></div>
          <motion.img
            variants={fadeIn("up", 0.7)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
            src="/images/qin.webp"
            alt="China Scene"
            className="h-[50vh] w-[20vw] object-cover"
          />
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        variants={fadeIn("up", 0.7)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.5 }}
        className="font-bold text-white backdrop-blur-3xl p-4 lg:p-10 
          relative z-30 flex flex-col items-start justify-start rounded-md 
          w-full lg:w-[40vw] mt-8 lg:mt-0"
      >
        <FlipText className="text-2xl lg:text-3xl">About</FlipText>
        <div className="flex flex-col">
          <FlipText className="text-5xl lg:text-9xl">Lakbay</FlipText>
          <FlipText className="text-4xl lg:text-8xl">Tsina</FlipText>
        </div>

        <p
          className="text-sm lg:text-[22px] pt-4 lg:pt-20 font-normal text-black 
          capitalize w-full lg:w-[40vw] text-start leading-6 tracking-widest"
        >
          {heading}
        </p>
        <p
          className="text-xs lg:text-[17px] pt-4 lg:pt-5 font-normal text-black/80 
          capitalize w-full lg:w-[40vw] text-start leading-6 tracking-widest"
        >
          {subHeading}
        </p>
      </motion.div>
    </motion.div>
  );
}
