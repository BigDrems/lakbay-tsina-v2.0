import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion, useInView } from "framer-motion";
import styles from "../styles/styles.module.scss";

export default function WelcomeSection() {
  const welcomeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isInView = useInView(welcomeRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: welcomeRef,
    offset: ["start end", "end start"],
  });

  const welcomeOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const welcomeY = useTransform(scrollYProgress, [0, 0.2], [100, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  useEffect(() => {
    if (isInView) {
      setIsVisible(true);
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const highlightVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  };

  return (
    <motion.section
      ref={welcomeRef}
      style={{ opacity: welcomeOpacity, y: welcomeY, scale }}
      className={styles.welcomeSection}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      aria-labelledby="welcome-title"
      role="region"
    >
      <motion.div className={styles.welcomeContent} variants={itemVariants}>
        <motion.h1
          id="welcome-title"
          className={styles.welcomeTitle}
          variants={itemVariants}
        >
          Maligayang Pagdating sa Lakbay Tsina!
        </motion.h1>

        <motion.div className={styles.welcomeText} variants={itemVariants}>
          <motion.p variants={itemVariants}>
            Kami ay mga mag-aaral mula sa kursong Bachelor of Secondary
            Education major in Social Studies, at ang website na ito ay bahagi
            ng aming course requirement sa asignaturang Research in Social
            Studies. Layunin naming pagbutihin ang paraan ng pagtuturo at
            pagkatuto ng Sinaunang Kabihasnan sa Tsina sa pamamagitan ng isang
            interakibong web-based material.
          </motion.p>

          <motion.p variants={itemVariants}>
            Ang mga nilalaman ng Lakbay Tsina ay hango sa Most Essential
            Learning Competencies (MELCs) ng Department of Education (DepEd)
            para sa Araling Panlipunan 8, partikular sa Quarter 1, Week 7-8.
            Dito, masusing tatalakayin at susuriin ang kabihasnang Tsino batay
            sa mga aspeto ng politika, ekonomiya, kultura, relihiyon,
            paniniwala, at lipunan.
          </motion.p>

          <motion.p
            className={styles.welcomeHighlight}
            variants={highlightVariants}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.98 }}
            role="note"
            aria-label="Special invitation message"
          >
            Kaya halina't samahan si Kuya Pao, ang aming masayang gabay, sa
            isang kapana-panabik na paglalakbay tungo sa kaalaman at kasaysayan
            ng Tsina!
          </motion.p>
        </motion.div>

        {/* Interactive Elements */}
        <motion.div
          className={styles.interactiveElements}
          variants={itemVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <motion.div
            className={styles.scrollIndicator}
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          >
            <div className={styles.scrollArrow}></div>
            <span className={styles.scrollText}>
              Mag-scroll para sa karagdagang impormasyon
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
