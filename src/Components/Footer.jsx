import React from 'react';
import { FaGithub, FaTwitter, FaBriefcase } from 'react-icons/fa';
import { FaPerson } from "react-icons/fa6";


const Footer = () => {
  return (
    <footer className="bg-inherit text-white py-6 w-full bottom-0 fixed">
      <div className="container mx-auto px-4  ">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-6">
            <a
              href="https://github.com/rahulchaudhari06"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://twitter.com/cipherotaku04"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 transition-colors"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="https://rahulll.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-400 transition-colors"
            >
              <FaPerson size={18} />
            </a>
          </div>
          
          {/* Signature */}
          <div className="text-xs text-gray-300">
            Made with 🫶🏼 by Rahul
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
