import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CircleUser, Menu, X } from "lucide-react";
import logo_1_1 from "/images/logo.png";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 60) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const pages = [
    { name: "Panimula", link: "/" },
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
      className="fixed top-0 left-0 right-0 w-full bg-[#cd201c] shadow-md z-50"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center w-[160px] h-[40px]">
          <img src={logo_1_1} alt="Lakbay Tsina Mobile" />
        </div>
        {/* Hamburger Menu (Mobile) */}
        <button
          className="bg-[#cd201c] border-none lg:hidden focus:outline-none"
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
        <div className="md:hidden backdrop-blur-md text-center py-4 space-y-4 shadow-md bg-[#cd201c]">
          {pages.map((page, idx) => (
            <NavLink
              to={page.link}
              key={idx}
              onClick={() => setIsOpen(false)}
              style={{ color: "white" }}
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
