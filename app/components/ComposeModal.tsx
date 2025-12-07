"use client";

import { useState } from "react";
import { X, Minus } from "lucide-react";

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComposeModal({ isOpen, onClose }: ComposeModalProps) {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isOpen) return null;

  return (
    <div 
      className={`
        fixed inset-0 z-50 flex justify-center transition-all duration-300
        ${isMinimized ? 'items-end mb-0 pointer-events-none' : 'items-center bg-black/50 backdrop-blur-sm'}
      `}
    >
      
      <div 
        className={`
          bg-white shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out
          ${isMinimized 
            ? 'w-[280px] h-[48px] rounded-t-lg pointer-events-auto cursor-pointer border border-zinc-300' 
            : 'w-[900px] h-[500px] rounded-xl animate-in fade-in zoom-in'
          }
        `}
      >
        
        <div 
          onClick={() => isMinimized && setIsMinimized(false)}
          className={`
            bg-[#F2F6FC] px-4 py-3 flex items-center justify-between border-b border-zinc-200
            ${isMinimized ? 'hover:bg-zinc-100' : ''}
          `}
        >
          <span className="text-sm font-semibold text-zinc-700">New Message</span>
          
          <div className="flex items-center gap-3 text-zinc-600">
            
            <button 
              onClick={(e) => {
                e.stopPropagation(); 
                setIsMinimized(true);
              }}
              className="hover:bg-zinc-200 rounded p-0.5 transition-colors"
            >
              <Minus size={18} />
            </button>

            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose(); 
                setIsMinimized(false);
              }} 
              className="hover:bg-red-500 hover:text-white rounded p-0.5 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className={`flex flex-col flex-1 bg-white ${isMinimized ? 'hidden' : 'flex'}`}>
          
          <div className="flex items-center border-b border-zinc-100 px-4 py-2">
            <span className="text-zinc-500 text-sm w-12">To</span>
            <input type="email" className="flex-1 outline-none text-zinc-800 text-sm py-1" />
          </div>

          <div className="flex items-center border-b border-zinc-100 px-4 py-2">
            <input type="text" placeholder="Subject" className="flex-1 outline-none text-zinc-800 text-sm py-1 placeholder:text-zinc-500" />
          </div>

          <textarea className="flex-1 resize-none outline-none p-4 text-zinc-800 text-sm font-sans" />

          <div className="p-3 flex items-center justify-between bg-white border-t border-zinc-100">
            <button className="bg-[#0B57D0] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-700 hover:shadow transition-all">
              Send
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}