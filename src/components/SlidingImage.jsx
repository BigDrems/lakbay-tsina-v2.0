import { useRef } from "react";
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
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div ref={container} className={styles.slidingImages + " w-full"}>
      <motion.div style={{ x: x1 }} className={styles.slider}>
        {slider1.map((project, index) => {
          return (
            <div
              key={index}
              className={styles.project}
              style={{ backgroundColor: project.color }}
            >
              <div className={styles.imageContainer}>
                <img
                  className="object-cover"
                  alt={"image"}
                  src={`/images/${project.src}`}
                />
              </div>
            </div>
          );
        })}
      </motion.div>
      <motion.div style={{ x: x2 }} className={styles.slider}>
        {slider2.map((project, index) => {
          return (
            <div
              key={index}
              className={styles.project}
              style={{ backgroundColor: project.color }}
            >
              <div key={index} className={styles.imageContainer}>
                <img alt={"image"} src={`/images/${project.src}`} />
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
