// src/components/Footer.jsx
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white py-6 mt-10 shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Left - Copyright */}
        <p className="text-sm text-gray-200">
          © {new Date().getFullYear()} <span className="font-bold">MyBlog</span>
          . All rights reserved.
        </p>

        {/* Center - Links */}
        <div className="flex gap-6 mt-3 md:mt-0">
          <a
            href="#"
            className="relative text-sm hover:text-yellow-300 transition after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="relative text-sm hover:text-yellow-300 transition after:content-[''] after:absolute after:w-0 after:h-[2px] after:left-0 after:-bottom-1 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-full"
          >
            Terms of Service
          </a>
        </div>

        {/* Right - Social Icons */}
        <div className="flex gap-4 mt-3 md:mt-0 text-lg">
          <a href="#" className="hover:text-yellow-300 transition">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-yellow-300 transition">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
