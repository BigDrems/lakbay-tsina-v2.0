import styles from "../styles/styles.module.scss";
import Picture1 from "/assets/10.jpg";
import Picture2 from "/assets/2.jpg";
import Picture3 from "/assets/8.jpg";
import Picture4 from "/assets/9.jpg";
import Picture5 from "/assets/1.jpg";
import Picture6 from "/assets/6.jpg";
import Picture7 from "/assets/11.jpg";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Index() {
  const container = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Adjust scale values based on screen size
  const getScaleValues = (baseScale) => {
    if (windowWidth <= 640) {
      return [1, baseScale * 0.5]; // Mobile - reduced scale
    } else if (windowWidth <= 768) {
      return [1, baseScale * 0.7]; // Tablet
    } else if (windowWidth <= 1024) {
      return [1, baseScale * 0.9]; // Small desktop
    }
    return [1, baseScale]; // Large desktop
  };

  const scale4 = useTransform(scrollYProgress, [0, 1], getScaleValues(8));
  const scale5 = useTransform(scrollYProgress, [0, 1], getScaleValues(9));
  const scale6 = useTransform(scrollYProgress, [0, 1], getScaleValues(9.5));
  const scale8 = useTransform(scrollYProgress, [0, 1], getScaleValues(10));
  const scale9 = useTransform(scrollYProgress, [0, 1], getScaleValues(10.5));

  const pictures = [
    {
      src: Picture1,
      scale: scale4,
    },
    {
      src: Picture2,
      scale: scale5,
    },
    {
      src: Picture3,
      scale: scale6,
    },
    {
      src: Picture4,
      scale: scale5,
    },
    {
      src: Picture5,
      scale: scale6,
    },
    {
      src: Picture6,
      scale: scale8,
    },
    {
      src: Picture7,
      scale: scale9,
    },
  ];

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={styles.el}>
              <div className={styles.imageContainer}>
                <img
                  src={src}
                  alt={`image ${index + 1}`}
                  placeholder="blur"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
