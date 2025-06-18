import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/images/history.png",
    title: "Kasaysayan at Dinastiya",
    subtitle: "Tuklasin ang Mayamang Kasaysayan ng Tsina",
    topic: "Kasaysayan",
    description:
      "Galugarin ang maraming siglo ng mga dinastiya ng Tsina na humubog sa pinakamatandang tuloy-tuloy na sibilisasyon sa mundo. Maglakbay sa panahon ng mga emperador, makabagong kaalaman, at mga pangkulturang tagumpay.",
    buttonText: "TUKLASIN PA",
  },
  {
    id: 2,
    image: "/images/kultura (2).png",
    title: "Kultura at mga Tradisyon",
    subtitle: "Maranasan ang mga Kultural na Kayamanan",
    topic: "Kultura at Tradisyon",
    description:
      "Isawsaw ang sarili sa matingkad na mga tradisyon ng Tsina, mula sa mga sinaunang pagdiriwang at seremonya hanggang sa mga pagpapahayag ng sining na nagbigay inspirasyon sa mundo sa loob ng maraming henerasyon.",
    buttonText: "TUKLASIN ANG KULTURA",
  },
  {
    id: 3,
    image: "/images/china.png",
    title: "Pulitika at Pamahalaan",
    subtitle: "Unawain ang Makabagong Pamamahala",
    topic: "Pulitika",
    description:
      "Makakuha ng kaalaman sa kumplikadong sistemang pampulitika ng Tsina at ang pagbabago nito mula sa sinaunang pamamahala ng mga emperador hanggang sa kasalukuyang makabagong istraktura ng pamamahala.",
    buttonText: "ARALIN ANG PULITIKA",
  },
  {
    id: 4,
    image: "/images/economy.jpg",
    title: "Pag-unlad sa Ekonomiya",
    subtitle: "Galugarin ang Pagbabago ng Ekonomiya",
    topic: "Ekonomiya",
    description:
      "Saksihan ang kahanga-hangang paglalakbay ng pag-angat ng ekonomiya ng Tsina at ang pagbabago nito tungo sa isang pandaigdigang kapangyarihan ng inobasyon, kalakalan, at kaunlaran.",
    buttonText: "PAG-ARALAN ANG EKONOMIYA",
  },
  {
    id: 5,
    image: "/images/geography.jpg",
    title: "Heograpiya at mga Tanawin",
    subtitle: "Maglakbay sa mga Tanawin ng Tsina",
    topic: "Heograpiya",
    description:
      "Maglakbay sa iba't ibang lupain ng Tsina mula sa mga tuktok ng Himalaya hanggang sa mga lambak ng Ilog Yangtze, at tuklasin kung paano hinubog ng heograpiya ang sibilisasyon ng Tsina.",
    buttonText: "GALUGARIN ANG HEOGRAPIYA",
  },
  {
    id: 6,
    image: "/images/technology.jpg",
    title: "Teknolohiya at Inobasyon",
    subtitle: "Saksihan ang mga Hakbang sa Teknolohiya",
    topic: "Teknolohiya",
    description:
      "Makita kung paano pinamumunuan ng Tsina ang pandaigdigang inobasyon sa mga larangan tulad ng renewable energy, artificial intelligence, at digital platforms na humuhubog sa ating kinabukasan.",
    buttonText: "TUKLASIN ANG TEKNOLOHIYA",
  },
  {
    id: 7,
    image: "/images/power.png",
    title: "Pandaigdigang Impluwensya",
    subtitle: "Unawain ang Pandaigdigang Epekto",
    topic: "Impluwensya at Diplomasya",
    description:
      "Tuklasin ang lumalagong papel ng Tsina sa pandaigdigang entablado sa pamamagitan ng mga inisyatibang diplomatiko, mga internasyonal na pakikipagtulungan, at mga palitan ng kultura sa buong kontinente.",
    buttonText: "GALUGARIN ANG IMPLUWENSYA",
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

  const contentVariants = {
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
      x: -50,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.7,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.7,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.7,
      },
    },
  };

  return (
    <div className="w-full h-[92vh] overflow-hidden bg-gray-50">
      <AnimatePresence mode="wait">
        {slides.map(
          (slide, index) =>
            currentIndex === index && (
              <div
                key={slide.id}
                className="flex flex-col lg:flex-row h-full w-full"
              >
                {/* Left content side - Made responsive */}
                <motion.div
                  className="w-full lg:w-1/2 h-full sm:h-auto lg:h-full flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 pt-16 pb-20 lg:py-0 relative overflow-hidden"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {/* Decorative elements - Adjusted for responsiveness */}
                  <div className="absolute top-12 left-8 md:left-12 w-12 md:w-20 h-12 md:h-20 rounded-full bg-[#daff0d]/20 blur-xl"></div>
                  <div className="absolute bottom-12 right-8 md:right-12 w-20 md:w-32 h-20 md:h-32 rounded-full bg-[#daff0d]/30 blur-xl hidden sm:block"></div>
                  <div className="absolute -left-8 top-1/2 w-8 md:w-16 h-40 md:h-64 bg-[#daff0d]/10 rounded-r-full hidden sm:block"></div>

                  {/* Topic badge */}
                  <div className="mb-3 md:mb-4">
                    <span className="bg-[#daff0d]/20 text-black px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium tracking-wide">
                      {slide.topic}
                    </span>
                  </div>

                  <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 max-w-xl relative z-10">
                    {/* Subtitle with decorative element */}
                    <div className="relative">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                        {slide.subtitle}
                      </h1>
                      <div className="absolute -left-2 sm:-left-4 top-1/2 w-1 sm:w-2 h-8 sm:h-12 bg-[#daff0d] rounded-r-md"></div>
                    </div>

                    {/* Title with highlight - Responsive font sizes */}
                    <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-700 italic">
                      {slide.title.split(" ").map((word, i) =>
                        i === 1 ? (
                          <span key={i} className="relative inline-block mx-1">
                            {word}
                            <span className="absolute bottom-1 left-0 w-full h-1.5 sm:h-2 bg-[#daff0d]/40 -z-10"></span>
                          </span>
                        ) : (
                          <span key={i}>{word} </span>
                        )
                      )}
                    </h2>

                    {/* Description with improved typography - Adjusted for mobile */}
                    <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed border-l-2 sm:border-l-4 border-[#daff0d]/50 pl-3 sm:pl-4 line-clamp-4 sm:line-clamp-none">
                      {slide.description}
                    </p>

                    {/* Button with animated arrow */}
                    <div className="mt-1 sm:mt-2">
                      <button className="group bg-[#daff0d] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2">
                        {slide.buttonText}
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    </div>

                    {/* Navigation hint - Hidden on smallest screens */}
                    <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm text-gray-500 mt-4 sm:mt-8">
                      <span className="w-6 sm:w-8 h-[1px] bg-gray-300"></span>
                      <span>
                        Slide {currentIndex + 1} of {slides.length}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Right image side - Made responsive */}
                <motion.div
                  className="w-full lg:w-1/2 h-[50vh] lg:h-full order-first lg:order-last"
                  variants={imageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </div>
            )
        )}
      </AnimatePresence>

      {/* Pagination dots - Made responsive */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 lg:-translate-x-3/4 flex justify-center items-center gap-1.5 sm:gap-2 w-full px-4 lg:w-auto z-20">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={`w-2.5 sm:w-3 h-2.5 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-[#daff0d] w-6 sm:w-8" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
