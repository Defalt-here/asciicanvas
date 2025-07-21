"use client";

import Canvas from "@/components/Canvas";
import { useEffect } from "react";
import { motion } from "framer-motion";

export default function CanvasPage() {
  useEffect(() => {
    document.title = "Canvas Editor - ASCII Canvas Creator";
  }, []);

  return (
    <motion.div 
      className="flex items-center justify-center min-h-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
      >
        <Canvas/>
      </motion.div>
    </motion.div>
  );
}
