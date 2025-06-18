import styles from "../styles/styles.module.scss";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const anim = {
  initial: { width: 0 },
  open: {
    width: "auto",
    transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
  },
  closed: { width: 0 },
};

export default function DynastyGallery({ project }) {
  const [isActive, setIsActive] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const { title1, title2, src } = project;

  useEffect(() => {
    // Preload the image immediately when component mounts
    const imagePath = `/dynasty/${src}`;

    import("../utils/imageUtils").then(({ preloadImage }) => {
      preloadImage(imagePath)
        .then(() => {
          setImageLoaded(true);
        })
        .catch((error) => {
          console.warn(`Failed to preload image: ${src}`, error);
          // Still set as loaded to prevent UI blocking
          setImageLoaded(true);
        });
    });
  }, [src]);

  const handleDynastyClick = () => {
    // Navigate to Dynasty Explorer with the specific dynasty pre-selected
    const fullDynastyName = `${title1} ${title2}`;
    return `/dynasty-explorer?dynasty=${encodeURIComponent(fullDynastyName)}`;
  };

  return (
    <Link to={handleDynastyClick()}>
      <div
        onMouseEnter={() => {
          setIsActive(true);
        }}
        onMouseLeave={() => {
          setIsActive(false);
        }}
        className={`${styles.project} group cursor-pointer w-screen`}
      >
        <motion.p
          className="text-white text-2xl sm:text-3xl font-semibold z-10 relative"
          whileHover={{ scale: 1.05 }}
        >
          {title1}
        </motion.p>
        <motion.div
          variants={anim}
          animate={isActive ? "open" : "closed"}
          className={`${styles.imgContainer} group-hover:opacity-90 transition-opacity`}
        >
          <img
            src={`/dynasty/${src}`}
            className={`${styles.galleryImage} transition-transform duration-300 group-hover:scale-105`}
            alt={`${title1} ${title2}`}
            style={{ visibility: imageLoaded ? "visible" : "hidden" }}
          />
        </motion.div>
        <motion.p
          className="text-white text-2xl sm:text-3xl font-semibold z-10 relative"
          whileHover={{ scale: 1.05 }}
        >
          {title2}
        </motion.p>
      </div>
    </Link>
  );
}
