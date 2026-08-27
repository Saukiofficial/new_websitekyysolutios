import { motion } from 'framer-motion';

export default function Card({ 
    children, 
    className = '',
    hover = true,
    glass = false,
    ...props 
}) {
    const baseClasses = glass
        ? 'bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl shadow-soft'
        : 'bg-white border border-slate-200/80 rounded-2xl shadow-soft';

    const hoverClass = hover 
        ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-soft-hover hover:border-blue-200/70' 
        : '';

    return (
        <div
            className={`${baseClasses} ${hoverClass} overflow-hidden ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
