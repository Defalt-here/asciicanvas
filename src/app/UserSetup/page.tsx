"use client";

import { jetBrainsMono } from "@/components/CodeFont";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserSetup() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <form onSubmit={handleSubmit}>
      <div className={`${jetBrainsMono.className} flex flex-col items-center justify-center min-h-screen bg-black p-8`}>
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
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${jetBrainsMono.className} px-8 py-3 bg-white text-black border-2 border-white hover:bg-gray-100 hover:border-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg transition-colors duration-200`}
          style={{ borderRadius: '0px' }}
        >
          {isSubmitting ? 'Creating Canvas...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
