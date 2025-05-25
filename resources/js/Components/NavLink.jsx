import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`
                inline-flex items-center px-2 py-1 text-sm font-medium transition-colors duration-300
                border-b-2 
                ${active 
                    ? 'text-cyan-400 border-cyan-500' 
                    : 'text-slate-300 border-transparent hover:text-cyan-300 hover:border-cyan-400'
                }
                ${className}
            `}
        >
            {children}
        </Link>
    );
}
