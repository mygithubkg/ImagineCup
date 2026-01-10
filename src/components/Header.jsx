import { Link } from 'react-router-dom';
import { Leaf, Menu } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import { Sprout } from 'lucide-react';
const Header = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-[#fdfbf7]/80 border-b border-green-900/5">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-green-800 rounded-lg flex items-center justify-center text-white">
        <Sprout size={20} />
      </div>
      <span className="font-serif text-xl font-bold text-green-900 tracking-tight">Agri-Eye</span>
    </div>
    <div className="hidden md:flex gap-8 text-sm font-medium text-green-800/70">
      <a href="#" className="hover:text-green-900 transition-colors">Our Roots</a>
      <a href="#" className="hover:text-green-900 transition-colors">The Technology</a>
      <a href="#" className="hover:text-green-900 transition-colors">Community</a>
    </div>
    <a
        href="/login"
        className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-200 transition-colors"
        >
        Login
        </a>
  </nav>
);
export default Header;