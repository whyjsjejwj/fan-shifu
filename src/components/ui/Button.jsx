import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? motion.slot : motion.button;

    const variants = {
        primary: 'bg-brand-red text-white hover:bg-red-700 shadow-md',
        secondary: 'bg-brand-orange text-white hover:bg-yellow-600',
        outline: 'border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white',
        ghost: 'hover:bg-brand-orange/10 text-brand-brown',
    };

    const sizes = {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8 text-lg',
        icon: 'h-10 w-10',
    };

    return (
        <Comp
            ref={ref}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
                'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red disabled:pointer-events-none disabled:opacity-50',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    );
});

Button.displayName = "Button";

export { Button };
