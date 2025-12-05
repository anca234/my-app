"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  // State untuk berpindah mode Login <-> Register
  const [isLogin, setIsLogin] = useState(true);
  
  // State untuk show/hide password
  const [showPassword, setShowPassword] = useState(false);

  // Form handling sementara (hanya console log dulu)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted in mode:", isLogin ? "Login" : "Register");
    // Nanti di sini kita masukkan logic Firebase
  };

  return (
    // Container Luar: Background Hitam Gelap (sesuai gambar)
    <div className="min-h-screen w-full bg-[#18181b] flex items-center justify-center p-4">
      
      {/* Card Putih */}
      <div className="bg-white w-full max-w-[440px] p-8 md:p-10 rounded-xl shadow-2xl">
        
        {/* Header Judul */}
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-zinc-900 mb-8">
          {isLogin ? "Welcome Back" : "Create an account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email Input */}
          <div className="space-y-1.5">
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-zinc-900"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-800 transition-all placeholder:text-zinc-400"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-zinc-900"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-800 transition-all placeholder:text-zinc-400 pr-12"
              />
              
              {/* Tombol Mata (Show/Hide) */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 p-1"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#18181b] text-white font-medium py-3.5 rounded-lg hover:bg-zinc-800 transition-colors mt-4"
          >
            {isLogin ? "Sign in" : "Sign Up"}
          </button>
        </form>

        {/* Footer Toggle Text */}
        <div className="mt-6 text-center text-zinc-500 text-sm">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-zinc-900 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-zinc-900 font-semibold hover:underline"
              >
                Log in
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}