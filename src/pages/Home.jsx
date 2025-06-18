import { useEffect, useState, lazy, Suspense } from "react";
import Lenis from "@studio-freight/lenis";
import page from "../styles/home.module.scss";
import WelcomePopup from "../components/WelcomeSection";

// Lazy load components
const ZoomParallax = lazy(() => import("../components/ZoomParallax"));
const SlidingImage = lazy(() => import("../components/SlidingImage"));
const DynastyGallery = lazy(() => import("../components/DynastyGallery"));
const ParallaxScroll = lazy(() => import("../components/ParallaxScroll"));
const Testimonials = lazy(() => import("../components/Testimonials"));

// Loading placeholders
const LoadingFallback = () => (
  <div className="w-full h-[50vh] bg-gray-100 animate-pulse"></div>
);

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  useEffect(() => {
    // Check if screen is mobile
    const checkMobile = () => {
      const isMobileDevice =
        window.innerWidth <= 768 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Lenis smooth scroll setup
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  // Show welcome popup on component mount
  useEffect(() => {
    // Check if popup has already been shown in this session
    const hasSeenPopup = sessionStorage.getItem("welcomePopupShown");

    if (!hasSeenPopup) {
      // Small delay to ensure smooth animation
      const timer = setTimeout(() => {
        setShowWelcomePopup(true);
        // Mark popup as shown in session storage
        sessionStorage.setItem("welcomePopupShown", "true");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false);
  };

  const projects = [
    { title1: "Xia", title2: "Dynasty", src: "xia.jpg" },
    { title1: "Shang", title2: "Dynasty", src: "shang.jpg" },
    { title1: "Zhou", title2: "Dynasty", src: "zhou.jpg" },
    { title1: "Qin", title2: "Dynasty", src: "qin.jpg" },
    { title1: "Han", title2: "Dynasty", src: "han.jpg" },
    { title1: "Tang", title2: "Dynasty", src: "tang.jpg" },
    { title1: "Song", title2: "Dynasty", src: "song.jpg" },
    { title1: "Yuan", title2: "Dynasty", src: "yuan.jpg" },
    { title1: "Ming", title2: "Dynasty", src: "ming.jpg" },
    { title1: "Qing", title2: "Dynasty", src: "qing.jpg" },
  ];

  // Preload dynasty images
  useEffect(() => {
    import("../utils/imageUtils").then(({ preloadImages }) => {
      // Only preload the first few images initially
      const imagesToPreload = projects
        .slice(0, 3)
        .map((project) => `/dynasty/${project.src}`);
      preloadImages(imagesToPreload);
    });
  }, []);

  return (
    <>
      {/* Welcome Popup */}
      <WelcomePopup
        isOpen={showWelcomePopup}
        onClose={handleCloseWelcomePopup}
      />

      <main className={page.main}>
        {!isMobile ? (
          <Suspense fallback={<LoadingFallback />}>
            <ZoomParallax />
          </Suspense>
        ) : null}
      </main>

      <Suspense fallback={<LoadingFallback />}>
        <ParallaxScroll />
      </Suspense>

      <Suspense fallback={<LoadingFallback />}>
        <SlidingImage />
      </Suspense>

      {projects.map((project, key) => (
        <Suspense key={key} fallback={<LoadingFallback />}>
          <DynastyGallery project={project} />
        </Suspense>
      ))}

      <Suspense fallback={<LoadingFallback />}>
        <Testimonials />
      </Suspense>
    </>
  );
};

export default Home;
