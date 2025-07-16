
import type { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 px-6 md:px-12 mt-8 rounded-t-xl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h3 className="text-xl font-semibold text-signmons-blue mb-4">
            Signmons Studio
          </h3>
          <p className="text-gray-400">Precision Vinyl Creations.</p>
          <p className="text-gray-400">Your Vision, Our Expertise.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold text-signmons-blue mb-4">
            Quick Links
          </h3>
          <ul>
            <li className="mb-2">
              <a
                href="#services"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Services
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#portfolio"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                Portfolio
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#about"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                About Us
              </a>
            </li>
          </ul>
        </div>
        <div id="contact">
          <h3 className="text-xl font-semibold text-signmons-blue mb-4">
            Contact Us
          </h3>
          <p className="text-gray-400 mb-2">
            Email:{" "}
            <a href="mailto:info@signmons.com" className="hover:underline">
              info@signmons.com
            </a>
          </p>
          <p className="text-gray-400 mb-2">
            Phone:{" "}
            <a href="tel:+15551234567" className="hover:underline">
              (555) 123-4567
            </a>
          </p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            {/* Social Media Icons (placeholders) */}
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.776-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V22H12c5.523 0 10-4.477 10-10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2.417a.75.75 0 01.07.867l-1.725 4.935a.75.75 0 01-.956.476l-4.935-1.725a.75.75 0 01-.476-.956l1.725-4.935a.75.75 0 01.956-.476l4.935 1.725zM12 22.5c-5.804 0-10.5-4.696-10.5-10.5S6.196 1.5 12 1.5s10.5 4.696 10.5 10.5-4.696 10.5-10.5 10.5zm-1.125-10.25a.75.75 0 01-.75-.75V7.5a.75.75 0 011.5 0v4a.75.75 0 01-.75.75zm0 2.5a.75.75 0 01-.75-.75V11a.75.75 0 011.5 0v3a.75.75 0 01-.75.75z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8 text-sm">
        &copy; 2025 Signmons Studio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
