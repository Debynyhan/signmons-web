
import type { FC } from "react";

interface HeaderProps {
  logoSrc: string; // Prop for the logo image source
}

const Header: FC<HeaderProps> = ({ logoSrc }) => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 md:px-12 flex justify-between items-center rounded-b-xl">
      <div className="flex items-center space-x-3">
        <img
          src={logoSrc}
          alt="Signmons Logo"
          className="h-12 w-auto rounded-full p-1 bg-signmons-blue"
        />
        <span className="text-2xl font-bold text-signmons-purple">
          Signmons Studio
        </span>
      </div>
      <nav className="hidden md:flex space-x-8">
        <a
          href="#services"
          className="text-gray-600 hover:text-signmons-blue font-medium transition-colors duration-300"
        >
          Services
        </a>
        <a
          href="#portfolio"
          className="text-gray-600 hover:text-signmons-blue font-medium transition-colors duration-300"
        >
          Portfolio
        </a>
        <a
          href="#about"
          className="text-gray-600 hover:text-signmons-blue font-medium transition-colors duration-300"
        >
          About Us
        </a>
        <a
          href="#contact"
          className="text-gray-600 hover:text-signmons-blue font-medium transition-colors duration-300"
        >
          Contact
        </a>
      </nav>
      <a
        href="#contact"
        className="hidden md:block bg-signmons-purple text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg"
      >
        Get a Quote
      </a>
      {/* Mobile Menu Button - You'd add state and logic for this in a full React app */}
      <button className="md:hidden text-signmons-purple focus:outline-none">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>
    </header>
  );
};

export default Header;
