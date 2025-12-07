"use client";

import { X, Minus, Maximize2 } from "lucide-react";

interface ComposeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComposeModal({ isOpen, onClose }: ComposeModalProps) {
  // Jika isOpen false, modal tidak akan dirender
  if (!isOpen) return null;

  return (
    // 1. Overlay Hitam (Background Gelap)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      
      {/* 2. Kotak Modal Putih */}
      <div className="bg-white w-[900px] h-[500px] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header: New Message */}
        <div className="bg-[#F2F6FC] px-4 py-3 flex items-center justify-between border-b border-zinc-200">
          <span className="text-sm font-semibold text-zinc-700">New Message</span>
          <div className="flex items-center gap-3 text-zinc-600">
            <Minus size={18} className="cursor-pointer hover:bg-zinc-200 rounded" />
            {/* Tombol Close */}
            <button onClick={onClose} className="hover:bg-red-500 hover:text-white rounded p-0.5 transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body Form */}
        <div className="flex flex-col flex-1">
          {/* Input To */}
          <div className="flex items-center border-b border-zinc-100 px-4 py-2">
            <span className="text-zinc-500 text-sm w-12">To</span>
            <input type="email" className="flex-1 outline-none text-zinc-800 text-sm py-1" />
          </div>

          {/* Input Subject */}
          <div className="flex items-center border-b border-zinc-100 px-4 py-2">
            <input type="text" placeholder="Subject" className="flex-1 outline-none text-zinc-800 text-sm py-1 placeholder:text-zinc-500" />
          </div>

          {/* Text Area */}
          <textarea className="flex-1 resize-none outline-none p-4 text-zinc-800 text-sm font-sans" />
        </div>

        {/* Footer: Tombol Send */}
        <div className="p-3 flex items-center justify-between bg-white">
          <button className="bg-[#0B57D0] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-700 hover:shadow transition-all">
            Send
          </button>
        </div>

      </div>
    </div>
  );
}