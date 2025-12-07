"use client";

import { useState } from "react";
import { 
  Menu, Search, User, Pencil, Inbox, Star, Send, 
  ArrowLeft, Archive, Trash2, Mail, MoreVertical, Reply, Forward,
  RefreshCcw, CheckSquare
} from "lucide-react";
import Link from "next/link";
import ComposeModal from "../components/ComposeModal"; 

const INITIAL_DATA = [
  { 
    id: 1, 
    folder: "inbox", 
    isStarred: false, 
    sender: "Vercel Security", 
    email: "security@vercel.com",
    title: "Important Security Update for Next.js 15 & 16", 
    snippet: "Patch now available to address vulnerability...", 
    body: "Hello User,\n\nWe have released a critical security patch for Next.js versions 15 and 16. Please update your project immediately to ensure the safety of your application.\n\nRun 'npm install next@latest' to update.\n\nBest,\nVercel Security Team",
    date: "6:33 AM", 
    isRead: false // Unread (Teks Tebal & Putih)
  },
  { 
    id: 2, 
    folder: "inbox",
    isStarred: true, 
    sender: "P.A.I.M.O.N", 
    email: "paimon@hoyoverse.com",
    title: "Welcome to Version Luna III: Get a new outfit for free!", 
    snippet: "The new dual-combat form character 'Durin'...", 
    body: "Traveler! \n\nPaimon has great news! Version Luna III is finally here. Log in now to claim your free outfit and 1600 Primogems.\n\nSee you in Teyvat!",
    date: "11:55 PM", 
    isRead: true // Unread (Teks Tebal & Putih)
  },
  { 
    id: 3, 
    folder: "inbox",
    isStarred: false,
    sender: "LinkedIn", 
    email: "jobs-listings@linkedin.com",
    title: "Orang Tua Group recently posted", 
    snippet: "Creative mind line up! we are searching for your talent...", 
    body: "Hi there,\n\nBased on your profile, we think you might be a good fit for this position at Orang Tua Group.\n\nApply now before it closes.",
    date: "Dec 1", 
    isRead: false // Read (Teks Abu-abu)
  },
  { 
    id: 4, 
    folder: "inbox",
    isStarred: false,
    sender: "GitHub", 
    email: "notifications@github.com",
    title: "[frontend-bootcamp] Pull Request #45 Merged", 
    snippet: "budi-santoso merged 3 commits into main...", 
    body: "Hello,\n\nThe pull request #45 'Fix: Login page responsiveness' has been successfully merged into 'main' by Budi Santoso.\n\nView the changes on GitHub.\n\nCheers,\nGitHub Team",
    date: "Dec 1", 
    isRead: false
  },
  { 
    id: 5, 
    folder: "inbox",
    isStarred: true, // Starred
    sender: "Tokopedia", 
    email: "no-reply@tokopedia.com",
    title: "Pembayaran Berhasil: Invoice INV/2025/12/01/XX", 
    snippet: "Hore! Pembayaranmu telah dikonfirmasi. Penjual akan segera...", 
    body: "Halo Michael,\n\nPembayaran untuk pesanan 'Mechanical Keyboard Keychron K2' telah berhasil diverifikasi. Penjual memiliki waktu 2x24 jam untuk mengirimkan pesananmu.\n\nCek status pesananmu di aplikasi Tokopedia.",
    date: "Nov 30", 
    isRead: true
  },
  { 
    id: 6, 
    folder: "inbox",
    isStarred: false,
    sender: "Spotify", 
    email: "hello@spotify.com",
    title: "Your 2025 Wrapped is here! 🎧", 
    snippet: "See what you listened to most this year. It might surprise you...", 
    body: "It's that time of the year again!\n\nYour 2025 Wrapped is ready. Find out your top songs, top artists, and how many minutes you spent listening to music this year.\n\n#SpotifyWrapped",
    date: "Nov 29", 
    isRead: false // Unread
  },
  { 
    id: 7, 
    folder: "inbox",
    isStarred: false,
    sender: "Dribbble", 
    email: "digest@dribbble.com",
    title: "10 New Design Trends for 2026", 
    snippet: "Glassmorphism is out, Claymorphism is in? See what's trending...", 
    body: "Hey Designer,\n\nStay ahead of the curve with these emerging design trends for the upcoming year. We've curated the best shots from top designers around the world.\n\nRead the full article on our blog.",
    date: "Nov 28", 
    isRead: false
  },
  { 
    id: 8, 
    folder: "inbox",
    isStarred: false,
    sender: "Zoom", 
    email: "meetings@zoom.us",
    title: "Invitation: Sprint Planning - Week 4", 
    snippet: "You have been invited to a scheduled Zoom meeting...", 
    body: "Topic: Sprint Planning - Week 4\nTime: Dec 7, 2025 10:00 AM Jakarta\n\nJoin Zoom Meeting\nhttps://zoom.us/j/123456789\n\nMeeting ID: 123 456 789\nPasscode: 12345",
    date: "Nov 28", 
    isRead: true
  },
  { 
    id: 9, 
    folder: "inbox",
    isStarred: false,
    sender: "Medium Daily Digest", 
    email: "noreply@medium.com",
    title: "Why React Server Components change everything", 
    snippet: "Dan Abramov just published a new story that you might like...", 
    body: "Top stories for you today:\n\n1. Why React Server Components change everything\n2. How to center a Div in 2025\n3. The end of Create React App\n\nRead more on Medium.",
    date: "Nov 27", 
    isRead: true
  },
  { 
    id: 10, 
    folder: "inbox",
    isStarred: false,
    sender: "Team Trello", 
    email: "do-not-reply@trello.com",
    title: "Card moved: 'Fix Navbar Bug' to 'Done'", 
    snippet: "Siti just moved a card in board 'Project Alpha'...", 
    body: "Activity on board Project Alpha:\n\nSiti moved card 'Fix Navbar Bug' from list 'In Progress' to list 'Done'.\n\nKeep up the good work!",
    date: "Nov 26", 
    isRead: true
  },
];
export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Inbox");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);
  
  // State Data Email
  const [emails, setEmails] = useState(INITIAL_DATA);
  
  // 1. STATE BARU: Menyimpan ID email yang dicentang
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [composeDefaultData, setComposeDefaultData] = useState<{to: string, subject: string, body?: string} | null>(null);

  // --- LOGIC: SELECT CHECKBOX ---
  const toggleSelection = (id: number) => {
    setSelectedIds((prev) => 
      prev.includes(id) 
        ? prev.filter((itemId) => itemId !== id) // Jika sudah ada, hapus (uncheck)
        : [...prev, id] // Jika belum ada, tambahkan (check)
    );
  };

  // --- LOGIC: DELETE SELECTED (BULK DELETE) ---
  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedIds.length} emails?`)) {
      // Hapus email yang ID-nya ada di dalam array selectedIds
      setEmails((prev) => prev.filter((email) => !selectedIds.includes(email.id)));
      setSelectedIds([]); // Reset seleksi
    }
  };

  const handleSendEmail = (data: { to: string; subject: string; body: string }) => {
    const newEmail = {
      id: Date.now(),
      folder: "sent",
      isStarred: false,
      sender: "Me",
      email: "me@gmailclone.com",
      title: data.subject || "(No Subject)",
      snippet: `To: ${data.to} - ${data.body.substring(0, 40)}...`,
      body: `To: ${data.to}\n\n${data.body}`,
      date: "Just now",
      isRead: true
    };
    setEmails([newEmail, ...emails]);
  };

  const toggleStar = (emailId: number) => {
    setEmails((prev) => prev.map((e) => e.id === emailId ? { ...e, isStarred: !e.isStarred } : e));
  };

  const handleReply = () => {
    if (selectedEmail) {
      setComposeDefaultData({ to: selectedEmail.email, subject: `Re: ${selectedEmail.title}`, body: "" });
      setIsComposeOpen(true);
    }
  };

  const handleForward = () => {
    if (selectedEmail) {
      setComposeDefaultData({
        to: "",
        subject: `Fwd: ${selectedEmail.title}`,
        body: `\n\n---------- Forwarded message ---------\nFrom: ${selectedEmail.sender} <${selectedEmail.email}>\nDate: ${selectedEmail.date}\nSubject: ${selectedEmail.title}\n\n${selectedEmail.body}`
      });
      setIsComposeOpen(true);
    }
  };

  const handleComposeNormal = () => {
    setComposeDefaultData(null);
    setIsComposeOpen(true);
  };

  const displayedEmails = emails.filter((email) => {
    if (activeTab === "Inbox") return email.folder === "inbox";
    if (activeTab === "Sent") return email.folder === "sent";
    if (activeTab === "Starred") return email.isStarred === true;
    return false;
  });

  return (
    <div className="flex h-screen w-full bg-[#18181b] text-zinc-300 font-sans overflow-hidden">
      
      <ComposeModal 
        isOpen={isComposeOpen} 
        onClose={() => setIsComposeOpen(false)}
        onSend={handleSendEmail}
        initialData={composeDefaultData} 
      />

      <aside className={`flex-shrink-0 flex flex-col bg-[#1E1E20] border-r border-zinc-800 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64 p-4' : 'w-[72px] py-4 px-2 items-center'}`}>
        <div className={`flex items-center mb-6 ${isSidebarOpen ? 'px-4 gap-3' : 'justify-center'}`}>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-zinc-700 rounded-full transition-colors"><Menu className="text-zinc-400 hover:text-white" /></button>
            {isSidebarOpen && <span className="text-xl font-semibold text-white tracking-wide">LOGO</span>}
        </div>
        <button onClick={handleComposeNormal} className={`flex items-center bg-white text-zinc-900 font-semibold mb-6 hover:bg-zinc-200 transition-all shadow-lg ${isSidebarOpen ? 'gap-3 px-6 py-4 rounded-2xl mx-0' : 'justify-center p-3 rounded-xl w-12 h-12'}`}>
          <Pencil size={20} />
          {isSidebarOpen && <span>Compose</span>}
        </button>
        <nav className="flex flex-col gap-1 w-full">
          <NavItem icon={<Inbox size={20} />} label="Inbox" isActive={activeTab === "Inbox"} onClick={() => {setActiveTab("Inbox"); setSelectedEmail(null); setSelectedIds([]);}} count={emails.filter(e => e.folder === 'inbox' && !e.isRead).length} isOpen={isSidebarOpen} />
          <NavItem icon={<Star size={20} />} label="Starred" isActive={activeTab === "Starred"} onClick={() => {setActiveTab("Starred"); setSelectedEmail(null); setSelectedIds([]);}} isOpen={isSidebarOpen} />
          <NavItem icon={<Send size={20} />} label="Sent" isActive={activeTab === "Sent"} onClick={() => {setActiveTab("Sent"); setSelectedEmail(null); setSelectedIds([]);}} isOpen={isSidebarOpen} />
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 bg-[#121212]">
        <header className="h-16 flex items-center justify-between px-4 py-2 bg-[#121212] border-b border-zinc-800">
           <div className="flex items-center flex-1 max-w-3xl bg-[#2D2D30] rounded-full px-4 py-3 mx-4">
            <Search size={20} className="text-zinc-400 mr-3" />
            <input type="text" placeholder={`Search in ${activeTab}`} className="bg-transparent border-none outline-none text-white w-full placeholder:text-zinc-500" />
          </div>
          <Link href="/dashboard/profile"> 
            <div className="w-10 h-10 rounded-full bg-zinc-600 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-zinc-500 transition-all">
               <User className="text-zinc-300" size={20} />
            </div>
          </Link>
        </header>

        {/* TOOLBAR BULK ACTION (Muncul jika ada email yang dipilih) */}
        {!selectedEmail && selectedIds.length > 0 && (
          <div className="h-12 flex items-center px-4 bg-[#1E1E20] border-b border-zinc-700 animate-in slide-in-from-top-2">
            <span className="text-sm text-white font-semibold mr-6">{selectedIds.length} selected</span>
            <button 
              onClick={handleBulkDelete}
              className="p-2 hover:bg-zinc-700 rounded-full text-zinc-300 hover:text-white transition-colors"
              title="Delete Selected"
            >
              <Trash2 size={18} />
            </button>
            <button className="p-2 hover:bg-zinc-700 rounded-full text-zinc-300 hover:text-white transition-colors ml-2">
              <Archive size={18} />
            </button>
            <button className="p-2 hover:bg-zinc-700 rounded-full text-zinc-300 hover:text-white transition-colors ml-2">
              <Mail size={18} />
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {selectedEmail ? (
            // === DETAIL VIEW ===
            <div className="flex flex-col h-full bg-[#121212]">
              <div className="flex items-center px-4 py-3 border-b border-zinc-800 gap-4 text-zinc-400">
                <button onClick={() => setSelectedEmail(null)} className="hover:text-white p-2 hover:bg-zinc-800 rounded-full"><ArrowLeft size={20} /></button>
                <div className="h-6 w-[1px] bg-zinc-700 mx-1"></div>
                <button className="hover:text-white p-2 hover:bg-zinc-800 rounded-full"><Archive size={18} /></button>
                <button className="hover:text-white p-2 hover:bg-zinc-800 rounded-full"><Trash2 size={18} /></button>
              </div>
              <div className="p-8 max-w-4xl mx-auto w-full">
                <div className="flex justify-between items-start mb-8">
                  <h1 className="text-2xl text-white font-normal flex-1">{selectedEmail.title}</h1>
                  <button onClick={() => toggleStar(selectedEmail.id)}>
                    <Star size={24} className={selectedEmail.isStarred ? "text-yellow-400 fill-yellow-400" : "text-zinc-500 hover:text-zinc-300"} />
                  </button>
                </div>
                <div className="flex items-start justify-between mb-8">
                   <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                      {selectedEmail.sender.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-white font-bold text-sm">{selectedEmail.sender}</span>
                        <span className="text-zinc-500 text-xs">&lt;{selectedEmail.email}&gt;</span>
                      </div>
                      <div className="text-zinc-500 text-xs mt-0.5">to me</div>
                    </div>
                  </div>
                  <span className="text-zinc-500 text-xs">{selectedEmail.date}</span>
                </div>
                <div className="text-zinc-300 whitespace-pre-line leading-relaxed text-sm">
                  {selectedEmail.body}
                </div>
                <div className="mt-10 flex gap-4">
                   <button onClick={handleReply} className="flex items-center gap-2 border border-zinc-600 text-zinc-400 px-6 py-2 rounded-full hover:bg-zinc-800 hover:text-white transition-colors">
                      <Reply size={16} /> Reply
                   </button>
                   <button onClick={handleForward} className="flex items-center gap-2 border border-zinc-600 text-zinc-400 px-6 py-2 rounded-full hover:bg-zinc-800 hover:text-white transition-colors">
                      <Forward size={16} /> Forward
                   </button>
                </div>
              </div>
            </div>
          ) : (
            // === LIST VIEW ===
            <div>
              {displayedEmails.length > 0 ? (
                displayedEmails.map((mail) => (
                  <div 
                    key={mail.id} 
                    onClick={() => {
                      // Mark as read saat dibuka
                      setEmails(prev => prev.map(e => e.id === mail.id ? {...e, isRead: true} : e));
                      setSelectedEmail(mail);
                    }}
                    // 2. STYLE LOGIC: BEDA GAYA UNTUK UNREAD & READ
                    className={`
                      group flex items-center gap-4 px-4 py-3 border-b border-zinc-800 cursor-pointer hover:shadow-md transition-all
                      ${!mail.isRead 
                        ? 'bg-[#202124] text-white' // UNREAD: Background agak terang, Teks Putih
                        : 'bg-[#121212] text-zinc-400' // READ: Background Gelap, Teks Abu
                      }
                      ${selectedIds.includes(mail.id) ? 'bg-[#323639]' : ''} // Highlight jika dicentang
                    `}
                  >
                    <div className="flex items-center gap-3 text-zinc-500" onClick={(e) => e.stopPropagation()}>
                      {/* CHECKBOX SEKARANG BERFUNGSI */}
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(mail.id)}
                        onChange={() => toggleSelection(mail.id)}
                        className="w-4 h-4 border-zinc-600 rounded bg-transparent accent-zinc-500 cursor-pointer" 
                      />
                      <Star size={18} onClick={() => toggleStar(mail.id)} className={`cursor-pointer transition-colors ${mail.isStarred ? 'text-yellow-400 fill-yellow-400' : 'hover:text-zinc-300'}`} />
                    </div>

                    {/* Sender: Bold jika Unread */}
                    <div className={`w-48 truncate ${!mail.isRead ? 'font-bold text-white' : 'font-normal text-zinc-300'}`}>
                      {mail.sender}
                    </div>

                    {/* Subject: Bold & Putih jika Unread */}
                    <div className="flex-1 truncate">
                      <span className={!mail.isRead ? 'font-bold text-white' : 'font-normal text-zinc-300'}>
                        {mail.title}
                      </span>
                      <span className="text-zinc-500 ml-2 font-normal">- {mail.snippet}</span>
                    </div>

                    {/* Date: Bold jika Unread */}
                    <div className={`text-xs w-20 text-right ${!mail.isRead ? 'font-bold text-white' : 'font-normal text-zinc-500'}`}>
                      {mail.date}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-[500px] text-zinc-500">
                  <div className="bg-zinc-800 p-6 rounded-full mb-4">{activeTab === "Starred" ? <Star size={40} /> : (activeTab === "Sent" ? <Send size={40} /> : <Inbox size={40} />)}</div>
                  <p className="text-lg">No emails in {activeTab}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick, count, isOpen }: any) {
    return (
      <div onClick={onClick} className={`flex items-center cursor-pointer transition-all duration-200 ${isOpen ? 'px-6 py-2 rounded-r-full mr-4 justify-between' : 'justify-center py-3 w-12 h-12 rounded-full mx-auto'} ${isActive ? 'bg-[#36373A] text-white font-bold' : 'text-zinc-400 hover:bg-[#2b2b2e]'}`} title={!isOpen ? label : ""}>
        <div className={`flex items-center ${isOpen ? 'gap-4' : ''}`}>
          {icon}
          {isOpen && <span>{label}</span>}
        </div>
        {isOpen && count > 0 && <span className="text-xs font-bold">{count}</span>}
      </div>
    )
}