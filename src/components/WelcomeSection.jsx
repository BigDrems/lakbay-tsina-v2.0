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
                  Ang Lakbay Tsina ay isang interaktibong web-based na nilikha
                  upang palalimin ang kaalaman ng mga mag-aaral hinggil sa
                  sinaunang kabihasnang Tsino. Ang nilalaman nito ay hango sa
                  Most Essential Learning Competencies (MELCs) ng Department of
                  Education para sa Araling Panlipunan 8, partikular sa Quarter
                  1, Week 7–8: Nasusuri ang mga sinaunang kabihasnan ng Egypt,
                  Mesopotamia, India, at China batay sa politika, ekonomiya,
                  kultura, relihiyon, paniniwala, at lipunan.
                </motion.p>

                <motion.p variants={itemVariants}>
                  Batay sa isinagawang pagsusuri ng mga mananaliksik, natuklasan
                  na sa apat na kabihasnang nabanggit, ang Tsina ang nakapagtamo
                  ng pinakamababang marka ng mga mag-aaral sa Lucsoon National
                  High School, Naval, Biliran. Dahil dito, naging pangunahing
                  layunin ng Lakbay Tsina na masusing talakayin at suriin ang
                  kabihasnang Tsino—mula sa aspeto ng politika at ekonomiya,
                  hanggang sa kultura, relihiyon, paniniwala, at lipunan—upang
                  mapunan ang mga puwang sa kaalaman ng mga mag-aaral.
                </motion.p>
                <motion.p variants={itemVariants}>
                  Sa pamamagitan ng makabagong disenyo at interaktibong
                  nilalaman, layon ng Lakbay Tsina na gawing mas kawili-wili,
                  mas malinaw, at mas epektibo ang pagkatuto ng sinaunang
                  kabihasnang Tsino. Nawa’y magsilbing gabay at inspirasyon ito
                  para sa mas malalim na pag-unawa sa kasaysayan ng isa sa mga
                  pinakamatandang sibilisasyon sa mundo.
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
