import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import styles from "../styles/styles.module.scss";

const slider1 = [
  {
    color: "#e3e5e7",
    src: "a.png",
  },
  {
    color: "#d6d7dc",
    src: "b.png",
  },
  {
    color: "#e3e3e3",
    src: "c.png",
  },
  {
    color: "#21242b",
    src: "d.png",
  },
];

const slider2 = [
  {
    color: "#d4e3ec",
    src: "e.png",
  },
  {
    color: "#e5e0e1",
    src: "f.png",
  },
  {
    color: "#d7d4cf",
    src: "g.png",
  },
  {
    color: "#e1dad6",
    src: "h.png",
  },
];

export default function SlidingImage() {
  const container = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  // Preload first two images from each slider
  useEffect(() => {
    import("../utils/imageUtils").then(({ preloadImage }) => {
      // Preload first two images from each slider
      preloadImage(`/images/${slider1[0].src}`).then(() =>
        setLoadedImages((prev) => ({ ...prev, [slider1[0].src]: true }))
      );
      preloadImage(`/images/${slider1[1].src}`).then(() =>
        setLoadedImages((prev) => ({ ...prev, [slider1[1].src]: true }))
      );
      preloadImage(`/images/${slider2[0].src}`).then(() =>
        setLoadedImages((prev) => ({ ...prev, [slider2[0].src]: true }))
      );
      preloadImage(`/images/${slider2[1].src}`).then(() =>
        setLoadedImages((prev) => ({ ...prev, [slider2[1].src]: true }))
      );
    });
  }, []);

  // Use Intersection Observer to detect when the component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);

          // Load remaining images when component becomes visible
          import("../utils/imageUtils").then(({ preloadImages }) => {
            const remainingImages1 = slider1
              .slice(2)
              .map((item) => `/images/${item.src}`);
            const remainingImages2 = slider2
              .slice(2)
              .map((item) => `/images/${item.src}`);

            preloadImages([...remainingImages1, ...remainingImages2]).then(
              (images) => {
                const newLoadedState = {};
                [...slider1.slice(2), ...slider2.slice(2)].forEach((item) => {
                  newLoadedState[item.src] = true;
                });
                setLoadedImages((prev) => ({ ...prev, ...newLoadedState }));
              }
            );
          });

          // Disconnect the observer after detection
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (container.current) {
      observer.observe(container.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (src) => {
    setLoadedImages((prev) => ({ ...prev, [src]: true }));
  };

  return (
    <div ref={container} className={styles.slidingImages + " w-full"}>
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {slider1.map((project, index) => {
          const isPreloaded =
            index < 2 || loadedImages[project.src] || isVisible;
          return (
            <div
              key={index}
              className={styles.project}
              style={{ backgroundColor: project.color }}
            >
              <div className={styles.imageContainer}>
                {isPreloaded ? (
                  <img
                    className="object-cover"
                    alt={"image"}
                    src={`/images/${project.src}`}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding={index < 2 ? "sync" : "async"}
                    onLoad={() => handleImageLoad(project.src)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
      <motion.div style={{ x: x2 }} className={styles.slider}>
        {slider2.map((project, index) => {
          const isPreloaded =
            index < 2 || loadedImages[project.src] || isVisible;
          return (
            <div
              key={index}
              className={styles.project}
              style={{ backgroundColor: project.color }}
            >
              <div key={index} className={styles.imageContainer}>
                {isPreloaded ? (
                  <img
                    alt={"image"}
                    src={`/images/${project.src}`}
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding={index < 2 ? "sync" : "async"}
                    onLoad={() => handleImageLoad(project.src)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>
      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </div>
  );
}
