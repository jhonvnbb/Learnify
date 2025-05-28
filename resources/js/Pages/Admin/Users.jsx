import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Users({ users }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredUsers = users
    .filter((user) => {
      if (filter === 'all') return true;
      return user.package_type === filter;
    })
    .filter((user) => {
      const query = search.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    });

  return (
    <AdminLayout>
      <Head title="Kelola Pengguna" />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-slate-800">Daftar Pengguna</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full font-medium text-sm transition ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-teal-500 to-sky-500 text-white shadow'
                  : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              Semua
            </button>
            <button
              onClick={() => setFilter('basic')}
              className={`px-4 py-2 rounded-full font-medium text-sm transition ${
                filter === 'basic'
                  ? 'bg-indigo-500 text-white shadow'
                  : 'bg-white text-indigo-600 border border-indigo-300 hover:bg-indigo-50'
              }`}
            >
              Paket Basic
            </button>
            <button
              onClick={() => setFilter('premium')}
              className={`px-4 py-2 rounded-full font-medium text-sm transition ${
                filter === 'premium'
                  ? 'bg-amber-500 text-white shadow'
                  : 'bg-white text-amber-600 border border-amber-300 hover:bg-amber-50'
              }`}
            >
              Paket Premium
            </button>
          </div>
        </div>

        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Cari nama ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow bg-white">
          <table className="min-w-[600px] w-full text-sm text-slate-700">
            <thead className="bg-slate-100 text-slate-600 text-left">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Nama</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Paket</th>
                <th className="px-6 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-t ${
                      index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                    }`}
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4 capitalize">
                      {user.package === 'premium' ? (
                        <span className="text-amber-600 font-semibold">Premium</span>
                      ) : (
                        <span className="text-indigo-600">Basic</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-slate-100 rounded-full">
                        Siswa
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-slate-400 italic"
                  >
                    Tidak ada pengguna ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
