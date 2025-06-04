import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { User, ShieldCheck, Star, BadgeCheck, Activity, Clock, Server, TrendingUp } from 'lucide-react';

export default function Dashboard({
  total_users = 0,
  total_admins = 0,
  total_basic = 0,
  total_premium = 0,
  recent_verified = [],
}) {
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <AdminLayout title="Dashboard Admin">
      <div className="space-y-10">

        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-teal-600 to-sky-600 text-white rounded-2xl p-6 shadow-xl">
          <div className="max-w-xl space-y-2">
            <h2 className="text-3xl md:text-4xl font-extrabold">Selamat Datang, Admin 👋</h2>
            <p className="text-slate-100">Kelola pengguna, paket, dan kontrol sistem dengan mudah melalui dashboard ini.</p>
            <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm font-medium">{today}</span>
          </div>
          <img src="/images/admin.svg" alt="Ilustrasi Admin" className="w-32 md:w-44 lg:w-52 mt-6 md:mt-0 animate-fade-in" />
        </div>

        {/* Statistik Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard icon={<User size={28} />} title="Total Pengguna" value={total_users} color="blue" />
          <StatCard icon={<ShieldCheck size={28} />} title="Total Admin" value={total_admins} color="green" />
          <StatCard icon={<BadgeCheck size={28} />} title="Paket Basic" value={total_basic} color="indigo" />
          <StatCard icon={<Star size={28} />} title="Paket Premium" value={total_premium} color="amber" />
        </div>

        {/* Ringkasan Sistem dan Aktivitas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Ringkasan Sistem */}
          <div className="bg-white rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="text-xl font-bold text-slate-700 flex items-center gap-2">
              <Server size={20} /> Ringkasan Sistem
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoTile label="Status Server" value="-" color="green" icon={<Activity />} />
              <InfoTile label="Waktu Aktif" value="-" color="blue" icon={<Clock />} />
              <InfoTile label="Pengguna Aktif Bulan Ini" value="-" color="indigo" icon={<TrendingUp />} />
              <InfoTile label="Trafik Hari Ini" value="-" color="amber" icon={<User />} />
            </div>
          </div>

          {/* Aktivitas Verifikasi Terbaru */}
          <div className="bg-white rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-slate-700 mb-4">Verifikasi Terbaru</h3>
            <ul className="divide-y divide-slate-100 text-sm text-slate-700">
              {recent_verified.map((user, i) => (
                <li key={i} className="py-3 flex justify-between">
                  <div>
                    <strong>{user.name}</strong> - <span className="text-slate-500">{user.email}</span>
                  </div>
                  <div className="text-slate-400">
                    {new Date(user.email_verified_at).toLocaleDateString('id-ID', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </li>
              ))}
              {recent_verified.length === 0 && (
                <li className="py-3 text-center text-slate-400">Belum ada verifikasi baru</li>
              )}
            </ul>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}


function StatCard({ title, value, icon, color = 'gray' }) {
  const colors = {
    blue: 'from-blue-50 to-blue-100 text-blue-900',
    green: 'from-green-50 to-green-100 text-green-900',
    indigo: 'from-indigo-50 to-indigo-100 text-indigo-900',
    amber: 'from-amber-50 to-amber-100 text-amber-900',
    gray: 'from-gray-50 to-gray-100 text-gray-900',
  };

  return (
    <div className={`bg-gradient-to-br ${colors[color]} p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300`}>
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg font-semibold">{title}</div>
        <div className="bg-white p-2 rounded-full shadow text-slate-800">{icon}</div>
      </div>
      <div className="text-4xl font-bold">{value}</div>
    </div>
  );
}

function InfoTile({ label, value, icon, color }) {
  const iconColors = {
    green: 'text-green-500',
    blue: 'text-blue-500',
    amber: 'text-amber-500',
    indigo: 'text-indigo-500',
  };

  return (
    <div className="bg-slate-50 p-4 rounded-xl shadow flex items-center gap-4 hover:bg-slate-100 transition">
      <div className={`p-2 rounded-full bg-white shadow ${iconColors[color]}`}>{icon}</div>
      <div>
        <div className="text-sm text-slate-600">{label}</div>
        <div className="text-lg font-bold text-slate-900">{value}</div>
      </div>
    </div>
  );
}
