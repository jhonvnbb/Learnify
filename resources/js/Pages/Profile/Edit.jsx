import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import {
  FiUser,
  FiLock,
  FiTrash2,
  FiChevronRight,
  FiCalendar,
  FiClock,
  FiShield,
} from 'react-icons/fi';
import dayjs from 'dayjs';

export default function Edit({ mustVerifyEmail, status, memberSince, packageType }) {
  const [activeTab, setActiveTab] = useState('info');

  const tabs = [
    { key: 'info', label: 'Personal Info', icon: <FiUser /> },
    { key: 'security', label: 'Security', icon: <FiLock /> },
    { key: 'danger', label: 'Danger Zone', icon: <FiTrash2 /> },
  ];

  return (
    <AuthenticatedLayout
      header={
        <div className="flex items-center">
          <div className="bg-indigo-500/10 p-3 rounded-xl mr-4">
            <FiUser className="w-6 h-6 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Profile Settings</h2>
        </div>
      }
    >
      <Head title="Profile" />

      <div className="py-8 bg-[#0f172a] min-h-screen text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Profile Stats */}
          <div className="space-y-6 col-span-1">
            {/* Stats Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 space-y-4">
              <div>
                <div className="text-slate-400 text-sm mb-1">Member Since</div>
                <div className="text-white font-medium flex items-center gap-2">
  <FiCalendar />
  {memberSince ? dayjs(memberSince).format('MMM D, YYYY') : 'Not Verified'}
</div>

              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">Last Active</div>
                <div className="text-white font-medium flex items-center gap-2 capitalize">
  <FiClock />
  {packageType ?? 'Basic'}
</div>

              </div>
              <div>
                <div className="text-slate-400 text-sm mb-1">Account Status</div>
                <div className="flex items-center text-green-400 font-medium gap-2">
                  <FiShield /> Active
                </div>
              </div>
            </div>

            {/* Tab Menu */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center justify-between p-4 text-sm font-medium transition ${
                    activeTab === tab.key
                      ? 'bg-indigo-600/20 text-indigo-400'
                      : 'hover:bg-slate-700/40 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {tab.icon}
                    {tab.label}
                  </div>
                  <FiChevronRight />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="col-span-1 lg:col-span-3 space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-slate-700/50 p-6 md:p-8">
              {activeTab === 'info' && (
                <>
                  <div className="flex items-center mb-6">
                    <div className="bg-indigo-500/10 p-2 rounded-lg mr-3">
                      <FiUser className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Profile Information</h3>
                  </div>
                  <UpdateProfileInformationForm
                    mustVerifyEmail={mustVerifyEmail}
                    status={status}
                  />
                </>
              )}

              {activeTab === 'security' && (
                <>
                  <div className="flex items-center mb-6">
                    <div className="bg-cyan-500/10 p-2 rounded-lg mr-3">
                      <FiLock className="w-5 h-5 text-cyan-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Update Password</h3>
                  </div>
                  <UpdatePasswordForm />
                </>
              )}

              {activeTab === 'danger' && (
                <>
                  <div className="flex items-center mb-6">
                    <div className="bg-red-500/10 p-2 rounded-lg mr-3">
                      <FiTrash2 className="w-5 h-5 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Delete Account</h3>
                  </div>
                  <DeleteUserForm />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
