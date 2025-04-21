import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import ZoomParallax from "../components/ZoomParallax";
import page from "../styles/home.module.scss";
import SlidingImage from "../components/SlidingImage";
import DynastyGallery from "../components/DynastyGallery";
import ParallaxScroll from "../components/ParallaxScroll";
import Testimonials from "../components/Testimonials";

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

  return (
    <>
      <main className={page.main}>{!isMobile && <ZoomParallax />}</main>
      <ParallaxScroll />
      <SlidingImage />

      {projects.map((project, key) => (
        <DynastyGallery key={key} project={project} />
      ))}
      <Testimonials />
    </>
  );
};

export default Home;
