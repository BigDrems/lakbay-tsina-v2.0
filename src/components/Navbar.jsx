import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CircleUser, Menu, X, LogOut } from "lucide-react";
import logo_1_1 from "/images/logo.png";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    localStorage.removeItem('welcomeDismissed');
    navigate('/signin');
  };

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
                `relative hover:text-white ${
                  isActive
                    ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white"
                    : "text-gray-200"
                }`
              }
            >
              {page.name}
            </NavLink>
          ))}
        </div>

        {/* User Icon (Always Visible) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              {role === 'admin' && (
                <NavLink 
                  to="/admin" 
                  className="text-white hover:text-gray-200 text-sm font-medium"
                >
                  Admin Dashboard
                </NavLink>
              )}
              <div className="w-8 h-8 rounded-full bg-[#efe9d7] text-[#cd201c] flex items-center justify-center font-bold">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <button 
                onClick={handleSignOut} 
                className="text-white hover:text-gray-200 flex items-center gap-2 bg-transparent border-none p-0"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <NavLink to="/signin" className="text-white hover:text-gray-200 font-medium">
              Sign In
            </NavLink>
          )}
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
          {user && role === 'admin' && (
            <NavLink
              to="/admin"
              onClick={() => setIsOpen(false)}
              style={{ color: "white" }}
              className="block text-[#efe9d7] hover:text-white transition"
            >
              Admin Dashboard
            </NavLink>
          )}
          {user ? (
            <button
              onClick={() => {
                handleSignOut();
                setIsOpen(false);
              }}
              className="block w-full text-[#efe9d7] hover:text-white transition bg-transparent border-none"
            >
              Sign Out
            </button>
          ) : (
            <NavLink
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="block text-[#efe9d7] hover:text-white transition"
            >
              Sign In
            </NavLink>
          )}
        </div>
      )}
    </motion.nav>
  );
}
