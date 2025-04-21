import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/images/history.png",
    title: "Kasaysayan at Dinastiya",
    author: "Ralph",
    topic: "Kasaysayan",
    description:
      "Ang sibilisasyon ng Tsina ay sumasaklaw ng libu-libong taon, na minarkahan ng mga maimpluwensyang dinastiya tulad ng Qin, Han, Tang, at Ming. Ang bawat panahon ay naging ambag sa pampulitika, pangkultura, at siyentipikong pundasyon ng bansa.",
  },
  {
    id: 2,
    image: "/images/kultura (2).png",
    title: "Kultura at mga Tradisyon",
    author: "LUNDEV",
    topic: "Kultura at Tradisyon",
    description:
      "Ang kulturang Tsino ay mayaman at iba't iba, na nagtatampok ng mga natatanging kaugalian tulad ng Lunar New Year, sayaw ng dragon, tradisyonal na medisina, at mga pilosopiya tulad ng Confucianism at Taoism.",
  },
  {
    id: 3,
    image: "/images/china.png",
    title: "Pulitika at Pamahalaan",
    author: "LUNDEV",
    topic: "Pulitika",
    description:
      "Ang Tsina ay pinamumunuan ng isang one-party system sa ilalim ng Partido Komunista. Ang sentralisadong pamahalaan nito ay may malaking papel sa paghubog ng mga patakaran, ekonomiya, at istrukturang panlipunan ng bansa.",
  },
  {
    id: 4,
    image: "/images/economy.jpg",
    title: "Pag-unlad sa Ekonomiya",
    author: "LUNDEV",
    topic: "Ekonomiya",
    description:
      "Bilang pangalawang pinakamalaking ekonomiya sa mundo, ang Tsina ay nakaranas ng mabilis na industriyalisasyon at teknolohikal na pag-unlad, na naging global na sentro ng manufacturing at kalakalan.",
  },
  {
    id: 5,
    image: "/images/geography.jpg",
    title: "Heograpiya at mga Tanawin",
    author: "LUNDEV",
    topic: "Heograpiya",
    description:
      "Saklaw ng malawak na heograpiya ng Tsina ang mga disyerto, kabundukan, ilog, at matatabang kapatagan. Ang heograpikong diversidad na ito ay sumusuporta sa parehong rural na agrikultura at malawakang urban development.",
  },
  {
    id: 6,
    image: "/images/technology.jpg",
    title: "Teknolohiya at Inobasyon",
    author: "LUNDEV",
    topic: "Teknolohiya",
    description:
      "Ang Tsina ay global na lider sa teknolohiya, na may mga pangunahing pagsulong sa AI, 5G, e-commerce, at renewable energy, na pinangunahan ng mga kumpanyang tulad ng Huawei, Tencent, at Alibaba.",
  },
  {
    id: 7,
    image: "/images/power.png",
    title: "Pandaigdigang Impluwensya",
    author: "LUNDEV",
    topic: "Impluwensya at Diplomasya",
    description:
      "May mahalagang papel ang Tsina sa pandaigdigang pulitika sa pamamagitan ng mga pamumuhunan sa ekonomiya, diplomatikong relasyon, at global na inisyatibo tulad ng Belt and Road Initiative.",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [nextSlide]);

  const slideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.7,
      },
    },
    exit: {
      opacity: 0,
      x: 50,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.7,
      },
    },
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.6,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            currentIndex === index && (
              <motion.div
                key={slide.id}
                className="absolute inset-0 w-full h-full"
                variants={slideVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <div className="w-full h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-in-out transform hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <motion.div
                  className="absolute top-[15%] sm:top-[20%] md:top-[25%] left-1/2 transform -translate-x-1/2 p-4 sm:p-6 md:p-8 
                         bg-black/40 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[43%] rounded-md max-h-[60vh] overflow-y-auto"
                  variants={descriptionVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 tracking-wide">
                    <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center sm:text-left">
                      {slide.title}
                    </h2>
                    <p className="text-white/80 text-base sm:text-lg md:text-xl text-justify tracking-wide">
                      {slide.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
        )}
      </AnimatePresence>
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center items-center gap-1.5 sm:gap-2 w-full px-4">
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.title}
            className={`w-10 h-10 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-cover cursor-pointer 
                       border-2 rounded-md transition-all duration-300 hover:scale-110 ${
                         index === currentIndex
                           ? "border-white opacity-100 scale-110"
                           : "border-gray-400 opacity-50"
                       }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
