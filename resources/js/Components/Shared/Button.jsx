import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function Button({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    href, 
    type = 'button',
    onClick,
    className = '',
    ...props 
}) {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-[10px] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
        primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] focus:ring-[#2563EB]/40 shadow-sm hover:shadow active:scale-[0.98]',
        secondary: 'bg-white text-[#0F172A] border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-300 shadow-sm active:scale-[0.98]',
        outline: 'bg-transparent text-[#2563EB] border border-[#2563EB]/30 hover:bg-blue-50/50 hover:border-[#2563EB] focus:ring-[#2563EB]/20',
        ghost: 'bg-transparent text-slate-700 hover:bg-slate-100/80 hover:text-[#0F172A] focus:ring-slate-200',
        dark: 'bg-[#0B1220] text-white hover:bg-[#1E293B] border border-white/10 shadow-sm focus:ring-slate-700',
        white: 'bg-white text-[#2563EB] hover:bg-blue-50 shadow-md font-semibold focus:ring-white/50',
    };
    
    const sizes = {
        sm: 'px-3.5 py-1.5 text-xs font-medium',
        md: 'px-5 py-2.5 text-sm font-medium',
        lg: 'px-6 py-3 text-base font-semibold',
    };
    
    const classes = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;
    
    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }
    
    return (
        <button
            type={type}
            onClick={onClick}
            className={classes}
            {...props}
        >
            {children}
        </button>
    );
}
