import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Lakbay Tsina</h2>
            <p className="text-slate-300 mb-6">
              Exploring Chinese culture, history, and language through
              interactive learning experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/lessons"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Lessons
                </Link>
              </li>
              <li>
                <Link
                  to="/entertainment"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Entertainment
                </Link>
              </li>
              <li>
                <Link
                  to="/dynasty-explorer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Dynasty Explorer
                </Link>
              </li>
            </ul>
          </div>

          {/* Games */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Mga Laro</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/games/character-match"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Pagpapares ng mga Karakter
                </Link>
              </li>
              <li>
                <Link
                  to="/games/dynasty-timeline"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Tagpo ng mga Dinastiya
                </Link>
              </li>
              <li>
                <Link
                  to="/games/cultural-quiz"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Pagsusulit sa Kultura
                </Link>
              </li>
              <li>
                <Link
                  to="/games/music-memory"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Dakilang Tagapagluto ng Lutuing Tsino
                </Link>
              </li>
              <li>
                <Link
                  to="/games/geography-explorer"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Taggalug ng Heograpiya
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              &copy; {currentYear} Lakbay Tsina. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
