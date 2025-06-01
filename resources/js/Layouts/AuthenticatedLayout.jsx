import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { FiHome, FiBook, FiUser, FiLogOut, FiMenu, FiX, FiChevronDown } from "react-icons/fi";

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1a233a] to-[#0f172a] text-white">
            {/* Top Navigation Bar */}
            <nav className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-700/50 shadow-xl relative z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Left Logo + Navigation */}
                        <div className="flex items-center space-x-10">
                            <Link
                                href="/"
                                className="flex items-center space-x-2 group"
                            >
                                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg group-hover:rotate-12 transition-transform">
                                    <FiBook className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 tracking-tight">
                                    Learnify
                                </span>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex space-x-1">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-800/50 hover:text-cyan-400"
                                >
                                    <FiHome className="mr-2" />
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    href={route("courses.index")}
                                    active={route().current("courses.index")}
                                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-800/50 hover:text-cyan-400"
                                >
                                    <FiBook className="mr-2" />
                                    Courses
                                </NavLink>
                            </div>
                        </div>

                        {/* Right Profile Section */}
                        <div className="hidden md:flex items-center space-x-6">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center space-x-2 focus:outline-none group">
                                        <div className="relative">
                                            <img
                                                className="h-9 w-9 rounded-full object-cover ring-2 ring-cyan-500/50 group-hover:ring-cyan-400 transition-all"
                                                src={user.profile_photo_url || '/images/pp.svg'}
                                                alt={user.name}
                                            />
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium">
                                                {user.name}
                                            </span>
                                            <FiChevronDown className="ml-1 text-slate-400 group-hover:text-cyan-400 transition-all" />
                                        </div>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content
                                    align="right"
                                    className="mt-2 w-56 bg-slate-800/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden z-[1000]"
                                >
                                    <div className="px-4 py-3 border-b border-slate-700/50">
                                        <div className="text-sm font-medium text-white">{user.name}</div>
                                        <div className="text-xs text-slate-400 truncate">{user.email}</div>
                                    </div>
                                    <Dropdown.Link 
                                        href={route("profile.edit")}
                                        className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-cyan-400 transition"
                                    >
                                        <FiUser className="mr-3" />
                                        Profile Settings
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="w-full text-left flex items-center px-4 py-2.5 text-sm text-slate-300 hover:bg-slate-700/50 hover:text-rose-400 transition"
                                    >
                                        <FiLogOut className="mr-3" />
                                        Sign Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="p-2 rounded-lg hover:bg-slate-800/50 text-slate-300 hover:text-cyan-400 focus:outline-none transition"
                            >
                                {showingNavigationDropdown ? (
                                    <FiX className="h-6 w-6" />
                                ) : (
                                    <FiMenu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {showingNavigationDropdown && (
                    <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50 shadow-xl relative z-[999]">
                        <div className="px-4 pt-2 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium"
                            >
                                <FiHome className="mr-3" />
                                Dashboard
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                href={route("courses.index")}
                                active={route().current("courses.index")}
                                className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium"
                            >
                                <FiBook className="mr-3" />
                                Courses
                            </ResponsiveNavLink>
                        </div>
                        <div className="pt-4 pb-3 border-t border-slate-700/50">
                            <div className="flex items-center px-4 pb-3">
                                <div className="relative mr-3">
                                    <img
                                        className="h-10 w-10 rounded-full object-cover ring-2 ring-cyan-500/50"
                                        src={user.profile_photo_url || '/images/pp.svg'}
                                        alt={user.name}
                                    />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></span>
                                </div>
                                <div>
                                    <div className="text-base font-medium text-white">{user.name}</div>
                                    <div className="text-sm text-slate-400">{user.email}</div>
                                </div>
                            </div>
                            <div className="px-2 space-y-1">
                                <ResponsiveNavLink 
                                    href={route("profile.edit")}
                                    className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium"
                                >
                                    <FiUser className="mr-3" />
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                    className="w-full text-left flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-rose-400"
                                >
                                    <FiLogOut className="mr-3" />
                                    Sign Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content Area */}
            <main className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8 relative z-30">
                {/* Page Header */}
                {header && (
                    <div className="mb-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 shadow-lg">
                                {header}
                            </div>
                        </div>
                    </div>
                )}

                {/* Page Content */}
                <div className="max-w-7xl mx-auto">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-lg">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}

