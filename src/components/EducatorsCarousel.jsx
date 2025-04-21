import { useState, useEffect, useRef } from "react";

const educators = [
  {
    id: 1,
    image: "/images/kevin.jpg",
    name: "Prof. Li Wei",
    specialty: "Chinese History",
    description:
      "Expert in Chinese dynasties with over 15 years of teaching experience at Beijing University. Specializes in Tang and Ming dynasty cultural developments.",
  },
  {
    id: 2,
    image: "/images/zhenzhi.jpg",
    name: "Dr. Chen Mei",
    specialty: "Mandarin Language",
    description:
      "Certified language instructor with innovative teaching methods. Developed multiple learning programs for non-native speakers focusing on practical conversation.",
  },
  {
    id: 3,
    image: "/images/zhenzhi_2.jpg",
    name: "Prof. Zhang Yong",
    specialty: "Chinese Literature",
    description:
      "Award-winning literature professor specializing in classical Chinese poetry and modern Chinese novels. Published author of three books on Chinese literary traditions.",
  },
  {
    id: 4,
    image: "/images/Li_Xian.jpg",
    name: "Dr. Wang Fei",
    specialty: "Chinese Philosophy",
    description:
      "Renowned expert in Confucian and Taoist philosophy with a focus on applying ancient wisdom to modern challenges. Regular speaker at international conferences.",
  },
  {
    id: 5,
    image: "/images/Liu-bang.jpg",
    name: "Prof. Liu Jing",
    specialty: "Chinese Art History",
    description:
      "Specialized in traditional Chinese painting, calligraphy, and ceramics. Curator for several international exhibitions featuring Chinese artistic traditions.",
  },
];

const EducatorsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef(null);
  const autoplayRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Add event listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set up autoplay
  useEffect(() => {
    autoplayRef.current = setTimeout(() => {
      handleNext();
    }, 5000);

    return () => {
      if (autoplayRef.current) {
        clearTimeout(autoplayRef.current);
      }
    };
  }, [activeIndex]);

  const handlePrev = () => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }
    setActiveIndex((prev) => (prev === 0 ? educators.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }
    setActiveIndex((prev) => (prev === educators.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }
    setActiveIndex(index);
  };

  // Calculate which educators to show in desktop view
  const getVisibleEducators = () => {
    if (isMobile) {
      return [educators[activeIndex]];
    }

    // Show 3 educators in desktop view with the active one in the middle
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const index = (activeIndex + i + educators.length) % educators.length;
      result.push({
        educator: educators[index],
        position: i, // -1 = left, 0 = center, 1 = right
      });
    }
    return result;
  };

  return (
    <section className="py-16 md:py-24 px-4 w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-red-600 font-medium uppercase mb-2">
            MEET OUR TEAM
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Educators
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team consists of highly qualified educators with expertise in
            various aspects of Chinese language, history, and culture.
          </p>
        </div>

        <div className="relative px-10">
          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-all"
            aria-label="Previous educator"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          <div ref={carouselRef} className="relative">
            {isMobile ? (
              // Mobile carousel
              <div className="transition-all duration-500 ease-in-out">
                {educators.map((educator, index) => (
                  <div
                    key={educator.id}
                    className={`
                      transition-all duration-500 ease-in-out flex flex-col items-center
                      ${index === activeIndex ? "block" : "hidden"}
                      p-6 bg-white rounded-xl shadow-md
                    `}
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-red-600">
                      <img
                        src={educator.image}
                        alt={educator.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/150?text=Profile";
                        }}
                      />
                    </div>

                    <h3 className="text-xl font-bold text-gray-800">
                      {educator.name}
                    </h3>
                    <p className="text-sm text-red-600 uppercase tracking-wider mb-4 font-semibold">
                      {educator.specialty}
                    </p>

                    <p className="text-center text-gray-600 mb-6">
                      {educator.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop carousel
              <div className="flex justify-center items-center">
                <div className="flex gap-6 md:gap-8 items-center justify-center">
                  {getVisibleEducators().map(({ educator, position }) => (
                    <div
                      key={educator.id}
                      className={`
                        transition-all duration-500 ease-in-out flex flex-col items-center
                        p-6 rounded-xl 
                        ${
                          position === 0
                            ? "z-10 scale-105 shadow-xl bg-white"
                            : "scale-95 opacity-70 bg-white shadow-md"
                        }
                        ${position === -1 ? "transform -translate-x-4" : ""}
                        ${position === 1 ? "transform translate-x-4" : ""}
                        min-w-[280px] max-w-sm
                      `}
                    >
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-red-600">
                        <img
                          src={educator.image}
                          alt={educator.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/150?text=Profile";
                          }}
                        />
                      </div>

                      <h3 className="text-xl font-bold text-gray-800">
                        {educator.name}
                      </h3>
                      <p className="text-sm text-red-600 uppercase tracking-wider mb-4 font-semibold">
                        {educator.specialty}
                      </p>

                      <p className="text-center text-gray-600 mb-6">
                        {educator.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-all"
            aria-label="Next educator"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>

        {/* Dot indicators (visible on both mobile and desktop) */}
        <div className="flex justify-center mt-8">
          {educators.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-red-600 scale-125" : "bg-gray-300"
              }`}
              aria-label={`Go to educator ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducatorsCarousel;
