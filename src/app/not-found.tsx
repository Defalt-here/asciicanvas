"use client";

import { jetBrainsMono } from "@/components/CodeFont";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface FloatingChar {
  id: number;
  char: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  fontSize: string;
}

export default function NotFound() {
  const [floatingChars, setFloatingChars] = useState<FloatingChar[]>([]);

  useEffect(() => {
    document.title = "404 - Page Not Found | ASCII Canvas";
    
    // Generate floating characters on client only
    const chars = ['?', '!', '*', '#', '@', '404', 'X', '~'];
    const newFloatingChars = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 4 + Math.random() * 3,
      delay: Math.random() * 2,
      fontSize: '1.2rem',
    }));
    setFloatingChars(newFloatingChars);
  }, []);

  const ascii404 = `
 ██╗  ██╗ ██████╗ ██╗  ██╗
 ██║  ██║██╔═████╗██║  ██║
 ███████║██║██╔██║███████║
 ╚════██║████╔╝██║╚════██║
      ██║╚██████╔╝     ██║
      ╚═╝ ╚═════╝      ╚═╝
                          
 ███╗   ██╗ ██████╗ ████████╗
 ████╗  ██║██╔═══██╗╚══██╔══╝
 ██╔██╗ ██║██║   ██║   ██║   
 ██║╚██╗██║██║   ██║   ██║   
 ██║ ╚████║╚██████╔╝   ██║   
 ╚═╝  ╚═══╝ ╚═════╝    ╚═╝   
                             
 ███████╗ ██████╗ ██╗   ██╗███╗   ██╗██████╗ 
 ██╔════╝██╔═══██╗██║   ██║████╗  ██║██╔══██╗
 █████╗  ██║   ██║██║   ██║██╔██╗ ██║██║  ██║
 ██╔══╝  ██║   ██║██║   ██║██║╚██╗██║██║  ██║
 ██║     ╚██████╔╝╚██████╔╝██║ ╚████║██████╔╝
 ╚═╝      ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝╚═════╝ `;

  return (
    <motion.div 
      className={`${jetBrainsMono.className} flex flex-col items-center justify-center min-h-screen bg-black text-green-500 p-8 relative overflow-hidden`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Floating ASCII Characters Background */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingChars.map((floatingChar) => (
          <motion.div
            key={floatingChar.id}
            className="absolute text-green-500 opacity-10 select-none"
            style={{
              left: `${floatingChar.x}%`,
              top: `${floatingChar.y}%`,
              fontSize: floatingChar.fontSize,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.2, 0.1, 0],
              scale: [0, 1, 1, 0],
              rotate: [0, 360],
              x: [-15, 15, -10],
              y: [-15, 10, -12],
            }}
            transition={{
              duration: floatingChar.duration,
              delay: floatingChar.delay,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            {floatingChar.char}
          </motion.div>
        ))}
      </div>

      {/* ASCII 404 Art */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <pre className="text-green-500 text-xs sm:text-sm md:text-base lg:text-lg leading-none text-center mb-8">
          {ascii404}
        </pre>
      </motion.div>

      {/* Error Message */}
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-2xl mb-4">Page Not Found</h1>
        <p className="text-lg opacity-80 mb-2">
          The page you&apos;re looking for doesn&apos;t exist in the ASCII universe.
        </p>
        <p className="text-base opacity-60">
          Maybe it was deleted, or you entered the wrong URL?
        </p>
      </motion.div>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
      >
        <Link href="/">
          <motion.button
            className={`${jetBrainsMono.className} px-8 py-4 text-lg border-2 border-green-500 text-green-500 bg-transparent rounded-lg transition-all duration-300 hover:bg-green-500 hover:text-black`}
            whileHover={{ 
              scale: 1.1,
              backgroundColor: "#22c55e",
              color: "#000000"
            }}
            whileTap={{ 
              scale: 0.95,
              y: 2
            }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 20 
            }}
          >
            ← Back to Home
          </motion.button>
        </Link>
      </motion.div>

      {/* Additional ASCII decorations */}
      <motion.div 
        className="absolute bottom-8 right-8 text-green-500 opacity-20 text-6xl"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        404
      </motion.div>
      
      <motion.div 
        className="absolute top-8 left-8 text-green-500 opacity-20 text-4xl"
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        ?
      </motion.div>
    </motion.div>
  );
}
