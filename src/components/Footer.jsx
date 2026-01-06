import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
const Footer = () => (
  <footer className="bg-[#143d28] text-white pt-20 pb-10 relative overflow-hidden">
    {/* Organic Root Pattern Overlay */}
    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
    
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-green-800 pb-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-serif text-3xl mb-6 text-yellow-50">Don't let the harvest wait.</h2>
          <p className="text-green-200/80 max-w-md leading-relaxed">
            Farming is the most noble profession. We are here to ensure your hard work yields the life you deserve. 
            <br/><br/>Stay connected to the soil, even when you are online.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-yellow-500 mb-4">Ecosystem</h4>
          <ul className="space-y-3 text-green-200/60 text-sm">
            <li className="hover:text-white cursor-pointer transition-colors">Market Prices</li>
            <li className="hover:text-white cursor-pointer transition-colors">Weather Patterns</li>
            <li className="hover:text-white cursor-pointer transition-colors">Soil Health</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-yellow-500 mb-4">Contact</h4>
          <ul className="space-y-3 text-green-200/60 text-sm">
            <li>help@livingharvest.com</li>
            <li>+91 98765 43210</li>
            <li>Nashik, Maharashtra</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs text-green-400/50">
        <p>© 2026 Living Harvest. Made with <Heart size={10} className="inline text-red-400"/> for the Earth.</p>
        <p>Respect the Soil.</p>
      </div>
    </div>
  </footer>
);

export default Footer;