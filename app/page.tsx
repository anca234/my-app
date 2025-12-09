"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin) {
      if (password !== confirmPassword) {
        alert("Passwords do not match!"); 
        return; 
      }
    }

    console.log("Form submitted. Redirecting...");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-[#18181b] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-[440px] p-8 md:p-10 rounded-xl shadow-2xl">
        
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-zinc-900 mb-8">
          {isLogin ? "Welcome Back" : "Create an account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-1.5">
            <label htmlFor="email" className="block text-sm font-medium text-zinc-900">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-800 transition-all placeholder:text-zinc-400 text-zinc-900"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-zinc-900">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-800 transition-all placeholder:text-zinc-400 pr-12 text-zinc-900"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 p-1"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="space-y-1.5 animate-in slide-in-from-top-2 fade-in duration-300">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-900">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  required
                  className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-800 transition-all placeholder:text-zinc-400 pr-12 text-zinc-900"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700 p-1"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#18181b] text-white font-medium py-3.5 rounded-lg hover:bg-zinc-800 transition-colors mt-4"
          >
            {isLogin ? "Sign in" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-zinc-500 text-sm">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => { setIsLogin(false); setConfirmPassword(""); }}
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