import React, { useState } from 'react';
import { Link, Head } from '@inertiajs/react';
import { Menu, X, Home, Users, LogOut } from 'lucide-react';

export default function AdminLayout({ children, title = 'Admin' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-100 to-slate-200 text-gray-900">
      <Head title={title} />

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-screen w-64 bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white shadow-2xl transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="p-6 border-b border-white/10 flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold text-teal-400 tracking-wide">Admin Panel</h1>
          <span className="text-sm text-slate-300">Selamat datang kembali</span>
        </div>
        <nav className="p-4 space-y-3">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 hover:bg-teal-600 transition text-slate-100"
          >
            <Home size={20} /> Dashboard
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 hover:bg-teal-600 transition text-slate-100"
          >
            <Users size={20} /> Users
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <Link
            method="post"
            href="/logout"
            as="button"
            className="w-full py-2 rounded-full font-semibold flex items-center justify-center gap-2 transition bg-gradient-to-r from-rose-500 to-pink-500 hover:opacity-90 shadow-md"
          >
            <LogOut size={18} /> Keluar
          </Link>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-md shadow-lg text-slate-800"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 ml-0 md:ml-64 p-6 md:p-8 transition-all duration-300 ease-in-out w-full">
        <div className="bg-white shadow-xl rounded-2xl p-6 md:p-10 min-h-[calc(100vh-80px)]">
          {children}
        </div>
      </main>
    </div>
  );
}
