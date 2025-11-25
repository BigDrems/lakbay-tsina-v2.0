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
      name: "Respondent 4",
      role: "USER",
      image: "https://api.dicebear.com/7.x/bottts/svg?seed=Luna",
      quote:
        "The landing page can be improved by slightly adjusting the text contrast for better readability, optimizing the layout for smaller screens, and adding subtle animations or hover effects to make it more dynamic. Include a short background image or cultural element from China to enhance visual storytelling.",
    },
    {
      id: 1,
      name: "Respondent 2",
      role: "USER",
      image: "https://api.dicebear.com/7.x/bottts/svg?seed=Leo",
      quote:
        "Lakbay Tsina is nice and will be useful to learners to better understand the Chinese dynasties.",
    },
    {
      id: 2,
      name: "Respondent 3",
      role: "USER",
      image: "https://api.dicebear.com/7.x/bottts/svg?seed=Milo",
      quote:
        "It creatively promotes learning about Chinese history and Culture through technology, making education.",
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
    <section className="py-20 md:py-32 px-4 w-full bg-gradient-to-b from-slate-50 to-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-200 blur-3xl mix-blend-multiply"></div>
        <div className="absolute top-1/2 right-0 w-72 h-72 rounded-full bg-red-200 blur-3xl mix-blend-multiply"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 relative">
          <div className="inline-block mb-4 relative group">
            <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-full"></div>
            <span className="relative inline-flex items-center gap-2 py-1.5 px-5 rounded-full bg-white border border-blue-100 text-blue-600 text-sm font-bold tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              TESTIMONIALS
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-700 to-slate-900 mb-6 tracking-tight drop-shadow-sm">
            What Our Users Say
          </h2>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover how <span className="text-blue-600 font-bold relative inline-block">
              Lakbay Tsina
              <svg className="absolute w-full h-2 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span> is helping learners explore Chinese history and culture.
          </p>
        </div>

        <div className="relative px-4 md:px-10">
          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:scale-110 transition-all text-slate-700 border border-slate-100"
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

          <div ref={carouselRef} className="relative py-10">
            {isMobile ? (
              // Mobile carousel
              <div className="transition-all duration-500 ease-in-out">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`
                      transition-all duration-500 ease-in-out flex flex-col items-center
                      ${index === activeIndex ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute top-0 left-0 w-full pointer-events-none"}
                      p-8 bg-white rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden
                    `}
                  >
                    <div className="absolute top-4 right-6 text-9xl text-slate-50 font-serif opacity-50 pointer-events-none">"</div>
                    
                    <div className="w-20 h-20 rounded-full overflow-hidden mb-6 ring-4 ring-blue-50 shadow-sm z-10">
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

                    <div className="flex text-yellow-400 mb-4 z-10">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>

                    <p className="text-center text-slate-600 mb-6 italic leading-relaxed z-10 relative">
                      "{testimonial.quote}"
                    </p>

                    <h3 className="text-lg font-bold text-slate-800 z-10">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-blue-500 font-bold uppercase tracking-widest z-10">
                      {testimonial.role}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop carousel
              <div className="flex justify-center items-center perspective-1000">
                <div className="flex gap-6 items-center justify-center w-full">
                  {getVisibleTestimonials().map(({ testimonial, position }) => (
                    <div
                      key={testimonial.id}
                      className={`
                        transition-all duration-700 ease-out flex flex-col items-center
                        p-8 rounded-2xl border relative overflow-hidden
                        ${
                          position === 0
                            ? "z-10 scale-110 shadow-2xl bg-white border-slate-100 opacity-100"
                            : "scale-90 opacity-40 bg-white/50 border-transparent blur-[1px] grayscale-[50%]"
                        }
                        ${position === -1 ? "transform -translate-x-12 rotate-y-12" : ""}
                        ${position === 1 ? "transform translate-x-12 -rotate-y-12" : ""}
                        w-[350px] min-h-[400px]
                      `}
                    >
                      <div className="absolute top-2 right-6 text-9xl text-slate-50 font-serif opacity-80 pointer-events-none">"</div>

                      <div className={`w-24 h-24 rounded-full overflow-hidden mb-6 ring-4 shadow-sm z-10 transition-all ${position === 0 ? 'ring-blue-100' : 'ring-transparent'}`}>
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

                      <div className="flex text-yellow-400 mb-6 z-10">
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

                      <p className="text-center text-slate-600 mb-8 italic leading-relaxed z-10 relative px-2">
                        "{testimonial.quote}"
                      </p>

                      <div className="mt-auto text-center z-10">
                        <h3 className="text-xl font-bold text-slate-800">
                          {testimonial.name}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white hover:scale-110 transition-all text-slate-700 border border-slate-100"
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

        {/* Dot indicators */}
        <div className="flex justify-center mt-12 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === activeIndex ? "w-8 bg-blue-600" : "w-2 bg-slate-300 hover:bg-blue-300"
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
