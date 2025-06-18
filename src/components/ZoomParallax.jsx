import styles from "../styles/styles.module.scss";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function Index() {
  const container = useRef(null);
  const welcomeRef = useRef(null);
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

  const { scrollYProgress: welcomeScrollProgress } = useScroll({
    target: welcomeRef,
    offset: ["start end", "end start"],
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

  // Welcome section animations
  const welcomeOpacity = useTransform(welcomeScrollProgress, [0, 0.2], [0, 1]);
  const welcomeY = useTransform(welcomeScrollProgress, [0, 0.2], [100, 0]);

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
    <>
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

      {/* Welcome Section */}
      <motion.div
        ref={welcomeRef}
        style={{ opacity: welcomeOpacity, y: welcomeY }}
        className={styles.welcomeSection}
      >
        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeTitle}>
            Maligayang Pagdating sa Lakbay Tsina!
          </h1>
          <div className={styles.welcomeText}>
            <p>
              Kami ay mga mag-aaral mula sa kursong Bachelor of Secondary
              Education major in Social Studies, at ang website na ito ay bahagi
              ng aming course requirement sa asignaturang Research in Social
              Studies. Layunin naming pagbutihin ang paraan ng pagtuturo at
              pagkatuto ng Sinaunang Kabihasnan sa Tsina sa pamamagitan ng isang
              interakibong web-based material.
            </p>
            <p>
              Ang mga nilalaman ng Lakbay Tsina ay hango sa Most Essential
              Learning Competencies (MELCs) ng Department of Education (DepEd)
              para sa Araling Panlipunan 8, partikular sa Quarter 1, Week 7-8.
              Dito, masusing tatalakayin at susuriin ang kabihasnang Tsino batay
              sa mga aspeto ng politika, ekonomiya, kultura, relihiyon,
              paniniwala, at lipunan.
            </p>
            <p className={styles.welcomeHighlight}>
              Kaya halina't samahan si Kuya Pao, ang aming masayang gabay, sa
              isang kapana-panabik na paglalakbay tungo sa kaalaman at
              kasaysayan ng Tsina!
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
