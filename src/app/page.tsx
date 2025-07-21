"use client";

import { jetBrainsMono } from "@/components/CodeFont";
import AsciiOutput from "@/components/ASCIIpre";
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
}

export default function Home() {
  const [floatingChars, setFloatingChars] = useState<FloatingChar[]>([]);
  
  useEffect(() => {
    document.title = "ASCII Canvas - Create Amazing ASCII Art";
  }, []);
  
  useEffect(() => {
    const asciiChars = ['@', '#', '*', '+', '.', '~', '^', '&', '%', '$', '!', '?', '|', '\\', '/', '-', '_', '='];
    
    const generateFloatingChars = () => {
      const chars: FloatingChar[] = [];
      for (let i = 0; i < 20; i++) {
        chars.push({
          id: i,
          char: asciiChars[Math.floor(Math.random() * asciiChars.length)],
          x: Math.random() * 100, // Percentage
          y: Math.random() * 100, // Percentage
          duration: 3 + Math.random() * 4, // 3-7 seconds
          delay: Math.random() * 2, // 0-2 seconds delay
        });
      }
      setFloatingChars(chars);
    };
    
    generateFloatingChars();
    
    // Regenerate chars every 5 seconds
    const interval = setInterval(generateFloatingChars, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className={`${jetBrainsMono.className} flex flex-col items-center justify-center min-h-screen bg-black text-green-500 p-8 relative overflow-hidden`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ 
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2
      }}
    >
      
      {/* Floating ASCII Characters Background */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingChars.map((floatingChar) => (
          <motion.div
            key={floatingChar.id}
            className="absolute text-green-500 opacity-20 select-none"
            style={{
              left: `${floatingChar.x}%`,
              top: `${floatingChar.y}%`,
              fontSize: '1.5rem',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 0.3, 0.2, 0],
              scale: [0, 1, 1, 0],
              rotate: [0, 360],
              x: [-20, 20, -10],
              y: [-20, 10, -15],
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

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [0, -10, 0] 
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          opacity: { duration: 0.6, ease: "easeOut" },
          scale: { duration: 0.6, ease: "easeOut" }
        }}
      >
        <AsciiOutput/>
      </motion.div>
      <motion.h1 
        className={`${jetBrainsMono.className} mt-10 text-2xl mb-2`}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
      >
        Create your next ASCII masterpiece
      </motion.h1>
      <motion.p 
        className="mb-12"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      >
        By Aditya Ranjan
      </motion.p>
      <motion.div 
        className="flex gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
      >
        {/* UserSetup Button */}
        <Link href="/UserSetup">
          <motion.button
            className={`${jetBrainsMono.className} cursor-pointer px-8 py-4 text-lg border-2 border-green-500 text-green-500 bg-transparent rounded-lg transition-all duration-300 hover:bg-green-500 hover:text-black`}
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
            Start Creating →
          </motion.button>
        </Link>

        {/* GitHub Button */}
        <motion.a
          href="https://github.com/Defalt-here/asciicanvas"
          target="_blank"
          rel="noopener noreferrer"
          className={`${jetBrainsMono.className} px-8 py-4 text-lg border-2 border-green-500 text-green-500 bg-transparent rounded-lg transition-all duration-300 hover:bg-green-500 hover:text-black inline-block`}
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
          View on GitHub
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
