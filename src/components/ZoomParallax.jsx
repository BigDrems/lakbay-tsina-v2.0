import styles from "../styles/styles.module.scss";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Index() {
  const container = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [imagesLoaded, setImagesLoaded] = useState({});

  // Define image paths
  const imagePaths = [
    "/assets/10.jpg",
    "/assets/2.jpg",
    "/assets/8.jpg",
    "/assets/9.jpg",
    "/assets/1.jpg",
    "/assets/6.jpg",
    "/assets/11.jpg",
  ];

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

  // Preload only the first two images initially
  useEffect(() => {
    import("../utils/imageUtils").then(({ preloadImage }) => {
      // Only preload the first two images immediately
      preloadImage(imagePaths[0]).then(() => {
        setImagesLoaded((prev) => ({ ...prev, [imagePaths[0]]: true }));
      });
      preloadImage(imagePaths[1]).then(() => {
        setImagesLoaded((prev) => ({ ...prev, [imagePaths[1]]: true }));
      });
    });
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

  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  // Handle image loading
  const handleImageLoad = (index) => {
    setImagesLoaded((prev) => ({ ...prev, [imagePaths[index]]: true }));
  };

  // Use Intersection Observer to load images as they approach viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index);
            if (!isNaN(index) && index < imagePaths.length) {
              import("../utils/imageUtils").then(({ preloadImage }) => {
                preloadImage(imagePaths[index]).then(() => {
                  handleImageLoad(index);
                });
              });
            }
          }
        });
      },
      { rootMargin: "200px" }
    );

    const elements = document.querySelectorAll(`.${styles.el}`);
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, [imagePaths.length]);

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {imagePaths.map((src, index) => {
          return (
            <motion.div
              key={index}
              style={{ scale: scales[index] }}
              className={styles.el}
              data-index={index}
            >
              <div className={styles.imageContainer}>
                {(imagesLoaded[src] || index < 2) && (
                  <img
                    src={src}
                    alt={`image ${index + 1}`}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding={index < 2 ? "sync" : "async"}
                    onLoad={() => handleImageLoad(index)}
                    className="w-full h-full object-cover"
                  />
                )}
                {!imagesLoaded[src] && index >= 2 && (
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
