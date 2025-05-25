import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen text-white">
            {/* Top Navbar */}
            <nav className="bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] shadow-md border-b border-cyan-500/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Left Logo + Nav */}
                        <div className="flex items-center space-x-8">
                            <Link
                                href="/"
                                className="text-white text-2xl font-bold tracking-wide"
                            >
                                Learnify
                            </Link>

                            <div className="hidden sm:flex space-x-6">
                                <NavLink
                                    href={route("dashboard")}
                                    active={route().current("dashboard")}
                                    className="text-sm font-medium px-2 py-1 border-b-2 transition-all duration-300"
                                >
                                    Dashboard
                                </NavLink>
                                {/* Tambah menu jika perlu */}
                            </div>
                        </div>

                        {/* Right Profile */}
                        <div className="hidden sm:flex items-center space-x-4">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center space-x-2 focus:outline-none">
                                        <img
                                            className="h-9 w-9 rounded-full object-cover ring-2 ring-cyan-400"
                                            src="/images/pp.svg"
                                            alt="User"
                                        />
                                        <span className="text-white text-sm font-medium">
                                            {user.name}
                                        </span>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content
                                    align="right"
                                    className="bg-[#1e293b] text-white ring-1 ring-cyan-500/30"
                                >
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        {/* Mobile Button */}
                        <div className="sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        !showingNavigationDropdown
                                    )
                                }
                                className="p-2 text-gray-300 hover:text-cyan-400 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {!showingNavigationDropdown ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Responsive Mobile Menu */}
                {showingNavigationDropdown && (
                    <div className="sm:hidden bg-[#1e293b] border-t border-cyan-500/20">
                        <div className="px-4 pt-4 pb-3 space-y-1">
                            <ResponsiveNavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="block text-white hover:text-cyan-400"
                            >
                                Dashboard
                            </ResponsiveNavLink>
                        </div>
                        <div className="border-t border-gray-700 pt-4 pb-3">
                            <div className="px-4 text-white">
                                <div className="text-base font-medium">
                                    {user.name}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {user.email}
                                </div>
                            </div>
                            <div className="mt-3 px-4 space-y-1">
                                <ResponsiveNavLink href={route("profile.edit")}>
                                    Profile
                                </ResponsiveNavLink>
                                <ResponsiveNavLink
                                    method="post"
                                    href={route("logout")}
                                    as="button"
                                >
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="bg-[#0f172a] min-h-[calc(100vh-4rem)] py-8 px-4 text-gray-100">
                {children}
            </main>
        </div>
    );
}
