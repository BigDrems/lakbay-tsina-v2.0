import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CircleUser, Menu, X } from "lucide-react";
import logo_1_1 from "/images/logo.png";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // Initialize without window reference
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll(); // Destructure scrollY properly

  // Track scroll direction to hide/show navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 60) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    // Set initial mobile state
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pages = [
    { name: "Umpisa", link: "/" },
    { name: "Tungkol", link: "/about" },
    { name: "Aralin", link: "/lessons" },
    { name: "Libangan", link: "/entertainment" },
  ];

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 w-full z-50 bg-[#cd201c] shadow-md"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center w-[160px] h-[40px]">
          {isMobile ? (
            <img src={logo_1_1} alt="Lakbay Tsina Mobile" />
          ) : (
            <img src={logo_1_1} alt="Lakbay Tsina Desktop" />
          )}
        </div>
        {/* Hamburger Menu (Mobile) */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex text-lg gap-8 text-[#efe9d7]">
          {pages.map((page, idx) => (
            <NavLink
              to={page.link}
              key={idx}
              style={{ color: "white" }}
              className={({ isActive }) =>
                ` hover:text-white ${
                  isActive ? "underline-custom text-white" : "text-gray-200"
                }`
              }
            >
              {page.name}
            </NavLink>
          ))}
        </div>

        {/* User Icon (Always Visible) */}
        <div className="hidden md:block">
          <CircleUser size={25} color="white" />
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#b10d0d]/30 backdrop-blur-md text-center py-4 space-y-4 shadow-md">
          {pages.map((page, idx) => (
            <NavLink
              to={page.link}
              key={idx}
              onClick={() => setIsOpen(false)}
              className="block text-[#efe9d7] hover:text-white transition"
            >
              {page.name}
            </NavLink>
          ))}
        </div>
      )}
    </motion.nav>
  );
}
