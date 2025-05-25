import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 rounded-md
                ${
                    active
                        ? 'border-cyan-500 bg-cyan-900/20 text-cyan-300'
                        : 'border-transparent text-slate-300 hover:border-cyan-600 hover:bg-cyan-800/30 hover:text-white'
                }
                text-base font-medium transition duration-150 ease-in-out focus:outline-none
                ${className}`}
        >
            {children}
        </Link>
    );
}
