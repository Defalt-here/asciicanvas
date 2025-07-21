"use client";

import { jetBrainsMono } from "@/components/CodeFont";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function UserSetup() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = "Setup Canvas - ASCII Canvas Creator";
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const settings = {
      height: parseInt(formData.get("height") as string) || 20,
      width: parseInt(formData.get("width") as string) || 40,
      textColor: formData.get("textColor") as string,
      backgroundColor: formData.get("backgroundColor") as string
    };
    
    // Store settings in localStorage or pass via URL params
    localStorage.setItem('canvasSettings', JSON.stringify(settings));
    
    // Navigate to canvas page
    setTimeout(() => {
      router.push('/Canvas');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
        <motion.h1 
          className={`${jetBrainsMono.className} flex flex-col items-center p-8 text-4xl text-green-500`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        >
          Setup your project here
        </motion.h1>       
      <motion.div 
        className={`${jetBrainsMono.className} flex flex-col items-center justify-center mt-10`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      >
               {/* Size Selector Section */}
        <div className="bg-white text-black p-6 shadow-md border-2 border-gray-300 mb-6">
          <h2 className="text-lg font-bold mb-4 text-center">Canvas Size</h2>
          <div className="flex space-x-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Height (rows)</label>
              <input 
                type="number"
                name="height"
                placeholder="20"
                min="5"
                max="200"
                className="border-2 border-gray-300 rounded p-2 w-24 text-center focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">Width (columns)</label>
              <input 
                type="number"
                name="width"
                placeholder="40"
                min="5"
                max="200"
                className="border-2 border-gray-300 rounded p-2 w-24 text-center focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Color Selector Section */}
        <div className="bg-white text-black p-6 shadow-md border-2 border-gray-300 mb-6">
          <h2 className="text-lg font-bold mb-4 text-center">Colors</h2>
          <div className="flex space-x-6">
            <div className="flex flex-col items-center">
              <label className="text-sm font-medium mb-2">Character Color</label>
              <input 
                type="color"
                name="textColor"
                defaultValue="#000000"
                className="w-16 h-12 border-2 border-gray-300 rounded cursor-pointer"
                title="Character Color" 
                required
              />
            </div>
            <div className="flex flex-col items-center">
              <label className="text-sm font-medium mb-2">Background Color</label>
              <input 
                type="color"
                name="backgroundColor"
                defaultValue="#ffffff"
                className="w-16 h-12 border-2 border-gray-300 rounded cursor-pointer"
                title="Background Color"
                required 
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`${jetBrainsMono.className} cursor-pointer px-8 py-4 text-lg border-2 border-green-500 text-green-500 bg-transparent rounded-lg transition-all duration-300 hover:bg-green-500 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed`}
          whileHover={{ 
            scale: isSubmitting ? 1 : 1.1,
            backgroundColor: isSubmitting ? "transparent" : "#22c55e",
            color: isSubmitting ? "#22c55e" : "#000000"
          }}
          whileTap={{ 
            scale: isSubmitting ? 1 : 0.95,
            y: isSubmitting ? 0 : 2
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20 
          }}
        >
          {isSubmitting ? 'Creating Canvas...' : 'Create Canvas →'}
        </motion.button>
      </motion.div>
    </motion.form>
  );
}
