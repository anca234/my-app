"use client";
import ComposeModal from "../components/ComposeModal"; // Sesuaikan path foldernya
import { useState } from "react";
import { 
  Menu, Search, User, Pencil, Inbox, Star, Send, 
  File, MoreVertical, ChevronLeft, ChevronRight 
} from "lucide-react";

// Data Dummy (Sama seperti sebelumnya)
const DUMMY_EMAILS = [
  { id: 1, sender: "Vercel Security", title: "Important Security Update for Next.js 15 & 16", snippet: "Patch now available to address vulnerability...", date: "6:33 AM", isRead: false },
  { id: 2, sender: "P.A.I.M.O.N", title: "Welcome to Version Luna III: Get a new outfit for free!", snippet: "The new dual-combat form character 'Durin'...", date: "11:55 PM", isRead: false },
  { id: 3, sender: "Enrichment Socs", title: "[Mandatory Event] Workshop Activity - Speak Forward", snippet: "Hello Future Leaders! Ever wondered how to tackle...", date: "Dec 3", isRead: false },
  { id: 4, sender: "LinkedIn", title: "Orang Tua Group recently posted", snippet: "Creative mind line up! we are searching for your talent...", date: "Dec 1", isRead: true },
  { id: 5, sender: "LinkedIn", title: "GDP Labs recently posted", snippet: "We're Hiring! 🚀 Join GDP Labs and Help Build...", date: "Nov 30", isRead: true },
  { id: 6, sender: "Google", title: "Notifikasi keamanan penting", snippet: "Beberapa sandi tersimpan Anda terekspos...", date: "Nov 29", isRead: true },
  { id: 7, sender: "Bill Gates via Link.", title: "These were some of my favorite books from 2025", snippet: "The holidays are almost here...", date: "Nov 29", isRead: true },
  { id: 8, sender: "Career Newsletter", title: "Career Newsletter November Vol. 3/2025", snippet: "Hallo BINUSIAN, Kabar gembira buat kalian...", date: "Nov 28", isRead: true },
  { id: 9, sender: "Academia.edu", title: "Updated Terms of Use and Privacy Policy", snippet: "Academia.edu Accelerate your research...", date: "Nov 27", isRead: true },
  { id: 10, sender: "BLIBLI", title: "Michael, Jangan Lupa Gunakan Voucher-mu!", snippet: "Halo Michael! Kamu masih punya voucher...", date: "Nov 27", isRead: true },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Inbox");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  
  // State untuk Mengatur Sidebar (Buka/Tutup)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-[#18181b] text-zinc-300 font-sans overflow-hidden">
        <ComposeModal 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)} 
        />
      {/* === SIDEBAR (KIRI) === */}
      <aside 
        className={`
          flex-shrink-0 flex flex-col bg-[#1E1E20] border-r border-zinc-800 transition-all duration-300 ease-in-out
          ${isSidebarOpen ? 'w-64 p-4' : 'w-[72px] py-4 px-2 items-center'}
        `}
      >
        
        {/* Header Sidebar (Menu & Logo) */}
        <div className={`flex items-center mb-6 ${isSidebarOpen ? 'px-4 gap-3' : 'justify-center'}`}>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 hover:bg-zinc-700 rounded-full transition-colors"
          >
            <Menu className="text-zinc-400 hover:text-white" />
          </button>
          
          {/* Logo hanya muncul jika sidebar terbuka */}
          {isSidebarOpen && (
            <span className="text-xl font-semibold text-white tracking-wide transition-opacity duration-300">
              LOGO
            </span>
          )}
        </div>

        {/* Tombol Compose */}
       <button 
          onClick={() => setIsComposeOpen(true)} // <-- Fungsi klik ditaruh di sini
          className={`
            flex items-center bg-white text-zinc-900 font-semibold mb-6 hover:bg-zinc-200 transition-all shadow-lg
            ${isSidebarOpen ? 'gap-3 px-6 py-4 rounded-2xl mx-0' : 'justify-center p-3 rounded-xl w-12 h-12'}
          `}
        >
          <Pencil size={20} />
          {/* Teks Compose hilang jika sidebar tertutup */}
          {isSidebarOpen && <span>Compose</span>}
        </button>

        {/* Menu Navigasi */}
        <nav className="flex flex-col gap-1 w-full">
          <NavItem 
            icon={<Inbox size={20} />} 
            label="Inbox" 
            isActive={activeTab === "Inbox"} 
            onClick={() => setActiveTab("Inbox")} 
            count={3} 
            isOpen={isSidebarOpen} // Kirim props status sidebar
          />
          <NavItem 
            icon={<Star size={20} />} 
            label="Starred" 
            isActive={activeTab === "Starred"} 
            onClick={() => setActiveTab("Starred")} 
            isOpen={isSidebarOpen}
          />
          <NavItem 
            icon={<Send size={20} />} 
            label="Sent" 
            isActive={activeTab === "Sent"} 
            onClick={() => setActiveTab("Sent")} 
            isOpen={isSidebarOpen}
          />
        </nav>
      </aside>


      {/* === MAIN CONTENT (KANAN) === */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#121212]">
        
        {/* Header Atas */}
        <header className="h-16 flex items-center justify-between px-4 py-2 bg-[#121212]">
          
          {/* Search Bar */}
          <div className="flex items-center flex-1 max-w-3xl bg-[#2D2D30] rounded-full px-4 py-3 mx-4">
            <Search size={20} className="text-zinc-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search mail" 
              className="bg-transparent border-none outline-none text-white w-full placeholder:text-zinc-500"
            />
          </div>

          {/* Profile Avatar */}
          <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-zinc-500">
             <User className="text-zinc-300" size={20} />
          </div>
        </header>

        {/* Daftar Email */}
        <div className="flex-1 overflow-y-auto">
          {DUMMY_EMAILS.map((mail) => (
            <div 
              key={mail.id} 
              className={`
                group flex items-center gap-4 px-4 py-3 border-b border-zinc-800 cursor-pointer 
                hover:bg-[#1f1f22] hover:shadow-md transition-all
                ${!mail.isRead ? 'bg-[#18181b] text-white font-semibold' : 'bg-[#121212] text-zinc-400'}
              `}
            >
              <div className="flex items-center gap-3 text-zinc-500">
                <input type="checkbox" className="w-4 h-4 border-zinc-600 rounded bg-transparent accent-zinc-500" />
                <Star size={18} className="hover:text-yellow-500 cursor-pointer" />
              </div>

              <div className={`w-48 truncate ${!mail.isRead ? 'text-white' : 'text-zinc-300'}`}>
                {mail.sender}
              </div>

              <div className="flex-1 truncate">
                <span className={!mail.isRead ? 'text-white' : 'text-zinc-300'}>{mail.title}</span>
                <span className="text-zinc-500 ml-2">- {mail.snippet}</span>
              </div>

              <div className={`text-xs w-20 text-right ${!mail.isRead ? 'text-white font-bold' : 'text-zinc-500'}`}>
                {mail.date}
              </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Komponen NavItem yang sudah di-update
function NavItem({ icon, label, isActive, onClick, count, isOpen }: any) {
  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center cursor-pointer transition-all duration-200
        ${isOpen 
          ? 'px-6 py-2 rounded-r-full mr-4 justify-between' // Mode Lebar
          : 'justify-center py-3 w-12 h-12 rounded-full mx-auto' // Mode Kecil (Lingkaran)
        }
        ${isActive 
          ? 'bg-[#36373A] text-white font-bold' 
          : 'text-zinc-400 hover:bg-[#2b2b2e]'
        }
      `}
      title={!isOpen ? label : ""} // Munculkan tooltip saat hover di mode kecil
    >
      <div className={`flex items-center ${isOpen ? 'gap-4' : ''}`}>
        {icon}
        {/* Text hanya muncul jika isOpen = true */}
        {isOpen && <span>{label}</span>}
      </div>
      
      {/* Badge Angka hanya muncul jika isOpen = true */}
      {isOpen && count && <span className="text-xs font-bold">{count}</span>}
    </div>
  )
}