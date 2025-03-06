import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import ZoomParallax from "../components/ZoomParallax";
import page from "../styles/home.module.scss";
import SlidingImage from "../components/SlidingImage";
import DynastyGallery from "../components/DynastyGallery";
import FlipText from "../components/FlipText";
import ParallaxScroll from "../components/ParallaxScroll";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check window width on mount & resize
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize(); // Initial check
    window.addEventListener("resize", checkScreenSize);

    // Lenis smooth scroll setup
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
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
    <main className={page.main}>
      {/* Hide ZoomParallax on Mobile */}
      {!isMobile && <ZoomParallax />}

      <ParallaxScroll />
      <SlidingImage />
      {projects.map((project, key) => (
        <DynastyGallery key={key} project={project} />
      ))}
    </main>
  );
};

export default Home;
