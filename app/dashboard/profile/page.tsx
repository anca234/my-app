"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Calendar, Users, LogOut, ArrowLeft, X } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const USER_DATA = {
    name: "Muhammad Rafliansyah",
    username: "@rafliansyah",
    joinedDate: "October 24, 2023", 
    avatarUrl: null
  };

  const handleLogout = () => {
    console.log("User logged out");
    
    router.push("/"); 
  };

  return (
    <div className="min-h-screen w-full bg-[#121212] text-zinc-300 font-sans p-6 flex justify-center items-center">
      
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white text-zinc-900 w-full max-w-sm rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2">Confirm Logout</h3>
              <p className="text-zinc-500 text-sm">
                Are you sure you want to log out of your account? You will be redirected to the login page.
              </p>
            </div>
            <div className="flex border-t border-zinc-100">
              <button 
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-colors border-r border-zinc-100"
              >
                Cancel
              </button>
              <button 
                onClick={handleLogout}
                className="flex-1 py-3 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        
        <Link href="/dashboard" className="flex items-center text-zinc-400 hover:text-white mb-6 transition-colors gap-2 w-fit">
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </Link>

        <div className="bg-[#1E1E20] rounded-2xl border border-zinc-800 overflow-hidden shadow-lg">
          
          <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>

          <div className="px-6 pb-8">
            
            <div className="relative -mt-12 mb-4">
              <div className="w-24 h-24 rounded-full bg-[#2D2D30] border-4 border-[#1E1E20] flex items-center justify-center overflow-hidden">
                {USER_DATA.avatarUrl ? (
                  <img src={USER_DATA.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-zinc-400" />
                )}
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white mb-1">{USER_DATA.name}</h1> {/* Show user name  */}
              <p className="text-zinc-500 font-medium">{USER_DATA.username}</p> {/* Show username  */}
            </div>

            <div className="grid grid-cols-2 gap mb-8">

              <div className="bg-[#2D2D30] p-4 rounded-xl flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-semibold">Joined</p>
                  <p className="text-white font-bold text-sm">{USER_DATA.joinedDate}</p> {/* Show joined date  */}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowLogoutModal(true)}
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 font-semibold py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-200"
            >
              <LogOut size={18} />
              Logout
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}