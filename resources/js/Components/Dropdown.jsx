import { Transition } from '@headlessui/react';
import { Link } from '@inertiajs/react';
import { createContext, useContext, useState, useRef, useEffect } from 'react';

const DropDownContext = createContext();

const Dropdown = ({ children }) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleOpen = () => {
        setOpen((prev) => !prev);
    };

    return (
        <DropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative" ref={dropdownRef}>
                {children}
            </div>
        </DropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, toggleOpen } = useContext(DropDownContext);

    return (
        <div 
            onClick={toggleOpen} 
            className="cursor-pointer"
            aria-expanded={open}
        >
            {children}
        </div>
    );
};

const Content = ({
    align = 'right',
    width = '48',
    contentClasses = '',
    children,
}) => {
    const { open, setOpen } = useContext(DropDownContext);

    let alignmentClasses = 'origin-top';

    if (align === 'left') {
        alignmentClasses = 'ltr:origin-top-left rtl:origin-top-right start-0';
    } else if (align === 'right') {
        alignmentClasses = 'ltr:origin-top-right rtl:origin-top-left end-0';
    }

    let widthClasses = width === '48' ? 'w-48' : '';

    return (
        <Transition
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            {/* Increased z-index to 9999 and added isolation */}
            <div
                className={`absolute z-[9999] mt-2 rounded-xl shadow-xl ${alignmentClasses} ${widthClasses}`}
                onClick={() => setOpen(false)}
                style={{ isolation: 'isolate' }} // Creates new stacking context
            >
                <div
                    className={`
                        rounded-xl bg-[#1e293b]/95 backdrop-blur-md text-white 
                        ring-1 ring-cyan-500/20 border border-slate-700/50
                        ${contentClasses}
                    `}
                >
                    {children}
                </div>
            </div>
        </Transition>
    );
};

const DropdownLink = ({ className = '', children, ...props }) => {
    return (
        <Link
            {...props}
            className={`
                block w-full px-4 py-2.5 text-left text-sm font-medium text-slate-200 
                hover:bg-slate-700/50 hover:text-cyan-400 transition-colors duration-150
                focus:outline-none focus:bg-slate-700/70 focus:text-cyan-400
                ${className}
            `}
        >
            {children}
        </Link>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;