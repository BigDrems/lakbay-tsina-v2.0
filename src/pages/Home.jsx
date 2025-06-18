import { useEffect, useState, lazy, Suspense } from "react";
import Lenis from "@studio-freight/lenis";
import page from "../styles/home.module.scss";
import WelcomeSection from "../components/WelcomeSection";

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

  useEffect(() => {
    // Check if screen is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
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

  const projects = [
    { title1: "Qin", title2: "Dynasty", src: "qin.webp" },
    { title1: "Han", title2: "Dynasty", src: "Liu-bang.jpg" },
    { title1: "Tang", title2: "Dynasty", src: "Li_Xian.jpg" },
    { title1: "Song", title2: "Dynasty", src: "song.webp" },
    { title1: "Sui", title2: "Dynasty", src: "sui.jpg" },
    { title1: "Yuan", title2: "Dynasty", src: "yuan.jpg" },
    { title1: "Zhou", title2: "Dynasty", src: "zhou.jpg" },
  ];

  // Preload dynasty images
  useEffect(() => {
    import("../utils/imageUtils").then(({ preloadImages }) => {
      // Only preload the first few images initially
      const imagesToPreload = projects
        .slice(0, 3)
        .map((project) => `/images/${project.src}`);
      preloadImages(imagesToPreload);
    });
  }, []);

  return (
    <>
      <main className={page.main}>
        {isMobile ? (
          <WelcomeSection />
        ) : (
          <Suspense fallback={<LoadingFallback />}>
            <ZoomParallax />
          </Suspense>
        )}
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
