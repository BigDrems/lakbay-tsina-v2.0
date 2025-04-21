import { useState, useEffect, useRef } from "react";

const Testimonials = () => {
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

  const testimonials = [
    {
      id: 0,
      name: "Pavel Nedved",
      role: "BUSINESSMAN",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      quote:
        "Some people dream of success, while other people get up every morning and make it happen.",
    },
    {
      id: 1,
      name: "Michel Platini",
      role: "DESIGNER",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      quote:
        "Some people dream of success, while other people get up every morning and make it happen.",
    },
    {
      id: 2,
      name: "Alfredo Stefano",
      role: "MARKETER",
      image: "https://randomuser.me/api/portraits/men/68.jpg",
      quote:
        "Some people dream of success, while other people get up every morning and make it happen.",
    },
    {
      id: 3,
      name: "Sofia Chen",
      role: "DEVELOPER",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      quote:
        "Innovation distinguishes between a leader and a follower. Success comes to those who pursue excellence.",
    },
    {
      id: 4,
      name: "Maria Garcia",
      role: "CONSULTANT",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      quote:
        "The difference between ordinary and extraordinary is that little extra. Put in the work, reap the rewards.",
    },
  ];

  const handlePrev = () => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }
    setActiveIndex(index);
  };

  // Calculate which testimonials to show in desktop view
  const getVisibleTestimonials = () => {
    if (isMobile) {
      return [testimonials[activeIndex]];
    }

    // Show 3 testimonials in desktop view with the active one in the middle
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const index =
        (activeIndex + i + testimonials.length) % testimonials.length;
      result.push({
        testimonial: testimonials[index],
        position: i, // -1 = left, 0 = center, 1 = right
      });
    }
    return result;
  };

  return (
    <section className="py-16 md:py-24 px-4 w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-blue-600 font-medium uppercase mb-2">
            TESTIMONIALS
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            Clients testimonials
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our approach thrives at the intersection between data-driven market
            research and traditional management consultancies.
          </p>
        </div>

        <div className="relative px-10">
          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-all"
            aria-label="Previous testimonial"
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
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`
                      transition-all duration-500 ease-in-out flex flex-col items-center
                      ${index === activeIndex ? "block" : "hidden"}
                      p-6 bg-white rounded-xl shadow-md
                    `}
                  >
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/150?text=Profile";
                        }}
                      />
                    </div>

                    <h3 className="text-xl font-bold text-gray-800">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                      {testimonial.role}
                    </p>

                    <p className="text-center text-gray-600 mb-6">
                      {testimonial.quote}
                    </p>

                    <div className="flex text-orange-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop carousel
              <div className="flex justify-center items-center">
                <div className="flex gap-6 md:gap-8 items-center justify-center">
                  {getVisibleTestimonials().map(({ testimonial, position }) => (
                    <div
                      key={testimonial.id}
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
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/150?text=Profile";
                          }}
                        />
                      </div>

                      <h3 className="text-xl font-bold text-gray-800">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                        {testimonial.role}
                      </p>

                      <p className="text-center text-gray-600 mb-6">
                        {testimonial.quote}
                      </p>

                      <div className="flex text-orange-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-md hover:bg-gray-100 transition-all"
            aria-label="Next testimonial"
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
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
                index === activeIndex ? "bg-blue-600 scale-125" : "bg-red-400"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
