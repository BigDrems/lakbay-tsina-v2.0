import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../styles/styles.module.scss";

export default function WelcomePopup({ isOpen, onClose }) {
  const welcomeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Prevent body scroll when popup is open
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      // Don't set overflow hidden on body to allow popup scrolling
    } else {
      setIsVisible(false);
      // Restore body scroll when popup is closed
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    // Cleanup on unmount
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY) * -1);
      }
    };
  }, [isOpen]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
        duration: 0.6,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  const handleContinue = () => {
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleWheel = (e) => {
    // Allow scrolling within the popup
    e.stopPropagation();
  };

  const handleTouchMove = (e) => {
    // Allow touch scrolling within the popup
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.welcomePopupOverlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          onWheel={handleWheel}
          onTouchMove={handleTouchMove}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="welcome-title"
        >
          <motion.div
            ref={welcomeRef}
            className={styles.welcomePopup}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onWheel={handleWheel}
            onTouchMove={handleTouchMove}
          >
            <motion.div
              className={styles.welcomeContent}
              variants={itemVariants}
            >
              <motion.h1
                id="welcome-title"
                className={styles.welcomeTitle}
                variants={itemVariants}
              >
                Maligayang Pagdating sa Lakbay Tsina!
              </motion.h1>

              <motion.div
                className={styles.welcomeText}
                variants={itemVariants}
              >
                <motion.p variants={itemVariants}>
                  Kami ay mga mag-aaral mula sa kursong Bachelor of Secondary
                  Education major in Social Studies, at ang website na ito ay
                  bahagi ng aming course requirement sa asignaturang Research in
                  Social Studies. Layunin naming pagbutihin ang paraan ng
                  pagtuturo at pagkatuto ng Sinaunang Kabihasnan sa Tsina sa
                  pamamagitan ng isang interakibong web-based material.
                </motion.p>

                <motion.p variants={itemVariants}>
                  Ang mga nilalaman ng Lakbay Tsina ay hango sa Most Essential
                  Learning Competencies (MELCs) ng Department of Education
                  (DepEd) para sa Araling Panlipunan 8, partikular sa Quarter 1,
                  Week 7-8. Dito, masusing tatalakayin at susuriin ang
                  kabihasnang Tsino batay sa mga aspeto ng politika, ekonomiya,
                  kultura, relihiyon, paniniwala, at lipunan.
                </motion.p>

                <motion.p variants={itemVariants}>
                  Ang aming layunin ay magbigay ng mas interaktibo at engaging
                  na paraan ng pag-aaral para sa mga mag-aaral ng Grade 8. Sa
                  pamamagitan ng mga laro, timeline, at multimedia content,
                  inaasahan naming mas madaling maunawaan at maalala ng mga
                  mag-aaral ang mga mahahalagang pangyayari at konsepto sa
                  kasaysayan ng Tsina.
                </motion.p>

                <motion.p variants={itemVariants}>
                  Ang website na ito ay naglalaman ng iba't ibang interactive
                  features tulad ng dynasty timeline, cultural games, geography
                  explorer, at marami pang iba. Bawat feature ay dinisenyo para
                  matulungan ang mga mag-aaral na mas malalim na maunawaan ang
                  kultura at kasaysayan ng Sinaunang Tsina.
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
                  Kaya halina't samahan si Kuya Pao, ang aming masayang gabay,
                  sa isang kapana-panabik na paglalakbay tungo sa kaalaman at
                  kasaysayan ng Tsina!
                </motion.p>
              </motion.div>

              {/* Continue Button */}
              <motion.div
                className={styles.welcomeActions}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  className={styles.continueButton}
                  onClick={handleContinue}
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Continue to explore Lakbay Tsina"
                >
                  <span>Magpatuloy</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
