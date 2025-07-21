
"use client";

import { useState, useEffect } from "react";
import { createGrid } from "@/utils/createGrid";

const INITIAL_ASCII_CHARACTERS = ["@", "#", "*", "+", ".", " "];

export default function Canvas ({rows: propRows = 20, cols: propCols = 40}) {
    const [rows, setRows] = useState(propRows);
    const [cols, setCols] = useState(propCols);
    const [grid, setGrid] = useState(() => createGrid(propRows, propCols));
    const [selectedChar, setSelectedChar] = useState("@");
    const [asciiCharacters, setAsciiCharacters] = useState(INITIAL_ASCII_CHARACTERS);
    const [newChar, setNewChar] = useState("");
    const [textColor, setTextColor] = useState("#000000");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");

    // Load settings from localStorage on component mount
    useEffect(() => {
        const savedSettings = localStorage.getItem('canvasSettings');
        if (savedSettings) {
            try {
                const settings = JSON.parse(savedSettings);
                setTextColor(settings.textColor || "#000000");
                setBackgroundColor(settings.backgroundColor || "#ffffff");
                setRows(settings.height || propRows);
                setCols(settings.width || propCols);
                // Recreate grid with new dimensions
                setGrid(createGrid(settings.height || propRows, settings.width || propCols));
                
                // Clear the settings after loading (optional)
                // localStorage.removeItem('canvasSettings');
            } catch (error) {
                console.error('Error loading canvas settings:', error);
            }
        }
    }, [propRows, propCols]);

    const clearCanvas = () => {
        setGrid(createGrid(rows, cols));
    };

    const addCustomCharacter = () => {
        if (newChar.length === 1 && !asciiCharacters.includes(newChar)) {
            setAsciiCharacters(prev => [...prev, newChar]);
            setNewChar("");
        }
    };

    const downloadASCII = () => {
        const timestamp = new Date().toISOString().slice(0, 10);
        
        // 1. Download TXT file
        const asciiString = grid.map(row => row.join('')).join('\n');
        const textBlob = new Blob([asciiString], { type: 'text/plain' });
        const textUrl = URL.createObjectURL(textBlob);
        const textLink = document.createElement('a');
        textLink.href = textUrl;
        textLink.download = `ascii-art-${timestamp}.txt`;
        document.body.appendChild(textLink);
        textLink.click();
        document.body.removeChild(textLink);
        URL.revokeObjectURL(textUrl);
        
        // 2. Create and download PNG image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        // Cell dimensions
        const cellWidth = 20;
        const cellHeight = 20;
        
        // Set canvas dimensions
        canvas.width = cols * cellWidth;
        canvas.height = rows * cellHeight;
        
        // Set font properties
        ctx.font = '14px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Fill background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw grid and characters
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const x = c * cellWidth;
                const y = r * cellHeight;
                
                // Fill cell background (same as main background)
                ctx.fillStyle = backgroundColor;
                ctx.fillRect(x, y, cellWidth, cellHeight);
                
                // Draw character
                const char = grid[r][c];
                if (char && char !== ' ') {
                    ctx.fillStyle = textColor;
                    ctx.fillText(char, x + cellWidth / 2, y + cellHeight / 2);
                }
            }
        }
        
        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
            if (blob) {
                const imageUrl = URL.createObjectURL(blob);
                const imageLink = document.createElement('a');
                imageLink.href = imageUrl;
                imageLink.download = `ascii-art-${timestamp}.png`;
                document.body.appendChild(imageLink);
                imageLink.click();
                document.body.removeChild(imageLink);
                URL.revokeObjectURL(imageUrl);
            }
        }, 'image/png');
    };

    // Function to convert hex color to opposite color
    const getOppositeColor = (hexColor: string) => {
        // Remove # if present
        const hex = hexColor.replace('#', '');
        
        // Parse RGB values
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Calculate opposite values (255 - original)
        const oppositeR = (255 - r).toString(16).padStart(2, '0');
        const oppositeG = (255 - g).toString(16).padStart(2, '0');
        const oppositeB = (255 - b).toString(16).padStart(2, '0');
        
        return `#${oppositeR}${oppositeG}${oppositeB}`;
    };
 
const updateCell = (r: number, c: number) => {
    setGrid((prev) => {
      const newGrid = [...prev.map((row) => [...row])];
      newGrid[r][c] = selectedChar;
      return newGrid;
    });
  };

 return (
    <>
      {/* Sticky Toolbar - Full Width */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md border-b-2 border-gray-300 p-4">
        <div className="flex items-center w-full space-x-6 max-w-none">
          {/* Character Selection */}
          <div className="flex space-x-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pb-2 max-w-md flex-shrink-0">
            {asciiCharacters.map((char) => (
              <div 
                key={char} 
                onClick={() => setSelectedChar(char)} 
                className={`border-2 cursor-pointer border-black p-2 text-black bg-white hover:bg-gray-100 min-w-8 flex-shrink-0 ${
                  selectedChar === char ? 'bg-gray-200' : ''
                }`}
              >
                {char === " " ? "␣" : char}
              </div>
            ))}
          </div>

          {/* Add Character */}
          <div className="flex items-center space-x-2 px-4 border-l-2 border-gray-300 flex-shrink-0">
            <input
              type="text"
              value={newChar}
              onChange={(e) => setNewChar(e.target.value.slice(0, 1))}
              placeholder="+"
              maxLength={1}
              className="w-12 h-10 text-center border-2 border-black text-black bg-white focus:bg-gray-50 focus:outline-none"
            />
            <button
              onClick={addCustomCharacter}
              disabled={!newChar || asciiCharacters.includes(newChar)}
              className="px-3 py-2 border-2 border-black bg-white text-black hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 px-4 border-l-2 border-gray-300 flex-shrink-0">
            <button
              onClick={clearCanvas}
              className="px-3 py-2 border-2 border-red-600 bg-red-50 text-red-600 hover:bg-red-100"
            >
              Clear
            </button>
            <button
              onClick={downloadASCII}
              className="px-3 py-2 border-2 border-green-600 bg-green-50 text-green-600 hover:bg-green-100"
            >
              Download
            </button>
          </div>

          {/* Spacer to push color pickers to the right */}
          <div className="flex-grow"></div>

          {/* Color Pickers */}
          <div className="flex items-center space-x-4 px-4 border-l-2 border-gray-300 flex-shrink-0">
            <div className="flex flex-col items-center space-y-1">
              <label className="text-xs text-black font-medium">Text</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-10 h-8 border-2 border-black rounded cursor-pointer"
                title="Text Color"
              />
            </div>
            <div className="flex flex-col items-center space-y-1">
              <label className="text-xs text-black font-medium">Background</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="w-10 h-8 border-2 border-black rounded cursor-pointer"
                title="Background Color"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Canvas Grid Container */}
      <div className="pt-24 p-4 flex justify-center">
        <div 
          className="grid border-2" 
          style={{ 
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            backgroundColor: backgroundColor,
            borderColor: getOppositeColor(backgroundColor),
            width: 'fit-content'
          }}
        >
          {grid.map((row, rIdx) =>
            row.map((char, cIdx) => (
              <div
                key={`${rIdx}-${cIdx}`}
                onClick={() => updateCell(rIdx, cIdx)}
                className="border text-center w-5 h-5 cursor-pointer text-xs hover:opacity-75 flex items-center justify-center"
                style={{
                  color: textColor,
                  backgroundColor: backgroundColor,
                  borderColor: getOppositeColor(backgroundColor)
                }}
              >
                {char}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
