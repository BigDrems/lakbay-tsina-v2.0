import { useState, useEffect, useRef } from "react";

const studentEducators = [
  {
    id: 1,
    image: "/teacher/abetto.jpg",
    name: "Abetto Palconit",
    description:
      '"Ang kaalaman ay ang pinakamagandang kayamanan na hindi mananakaw sa atin."\n\n- Confucius',
  },
  {
    id: 2,
    image: "/teacher/angela.jpg",
    name: "Angela Bacunawa",
    description:
      '"Ang pag-aaral ay isang paglalakbay, hindi isang destinasyon."\n\n- Ralph Waldo Emerson',
  },
  {
    id: 3,
    image: "/teacher/cristina.jpg",
    name: "Cristina Magdaraog",
    description:
      '"Ang edukasyon ay hindi paghahanda para sa buhay; ito ay buhay mismo."\n\n- John Dewey',
  },
  {
    id: 4,
    image: "/teacher/jenilyn.jpg",
    name: "Jenilyn Verian Florito",
    description:
      '"Ang karunungan ay nagsisimula sa pagkamangha."\n\n- Socrates',
  },
  {
    id: 5,
    image: "/teacher/maybeline.jpg",
    name: "Maybeline Lastimado",
    description:
      '"Ang sining ay ang pinakamagandang paraan ng pagpapahayag ng katotohanan."\n\n- Pablo Picasso',
  },
  {
    id: 6,
    image: "/teacher/ralph.jpg",
    name: "Ralph Joshua Mapula",
    description:
      '"Ang mundo ay isang aklat, at ang mga hindi naglalakbay ay nagbabasa lamang ng isang pahina."\n\n- Saint Augustine',
  },
];

const StudentEducatorsCarousel = () => {
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
    setActiveIndex((prev) =>
      prev === 0 ? studentEducators.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }
    setActiveIndex((prev) =>
      prev === studentEducators.length - 1 ? 0 : prev + 1
    );
  };

  const handleDotClick = (index) => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }
    setActiveIndex(index);
  };

  // Calculate which student educators to show in desktop view
  const getVisibleStudentEducators = () => {
    if (isMobile) {
      return [studentEducators[activeIndex]];
    }

    // Show 3 student educators in desktop view with the active one in the middle
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const index =
        (activeIndex + i + studentEducators.length) % studentEducators.length;
      result.push({
        studentEducator: studentEducators[index],
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
            MEET OUR STUDENT EDUCATORS
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Learning & Teaching Together
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our student educators are passionate learners who also help others
            discover Chinese language, history, and culture through peer-to-peer
            learning.
          </p>
        </div>

        <div className="relative px-10">
          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-all"
            aria-label="Previous student educator"
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
                {studentEducators.map((studentEducator, index) => (
                  <div
                    key={studentEducator.id}
                    className={`
                      transition-all duration-500 ease-in-out flex flex-col items-center
                      ${index === activeIndex ? "block" : "hidden"}
                      p-6 bg-white rounded-xl shadow-md
                    `}
                  >
                    <div className="w-32 h-40 rounded-2xl overflow-hidden mb-6 border-4 border-red-600">
                      <img
                        src={studentEducator.image}
                        alt={studentEducator.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/150?text=Student+Educator";
                        }}
                      />
                    </div>

                    <h3 className="text-xl font-bold text-gray-800">
                      {studentEducator.name}
                    </h3>

                    <p className="text-center text-gray-600 mb-6 whitespace-pre-line italic">
                      {studentEducator.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop carousel
              <div className="flex justify-center items-center">
                <div className="flex gap-6 md:gap-8 items-center justify-center">
                  {getVisibleStudentEducators().map(
                    ({ studentEducator, position }) => (
                      <div
                        key={studentEducator.id}
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
                        <div className="w-32 h-40 rounded-2xl overflow-hidden mb-6 border-4 border-red-600">
                          <img
                            src={studentEducator.image}
                            alt={studentEducator.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/150?text=Student+Educator";
                            }}
                          />
                        </div>

                        <h3 className="text-xl font-bold text-gray-800">
                          {studentEducator.name}
                        </h3>

                        <p className="text-center text-gray-600 mb-6 whitespace-pre-line italic">
                          {studentEducator.description}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-all"
            aria-label="Next student educator"
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
          {studentEducators.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-red-600 scale-125" : "bg-gray-300"
              }`}
              aria-label={`Go to student educator ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StudentEducatorsCarousel;
