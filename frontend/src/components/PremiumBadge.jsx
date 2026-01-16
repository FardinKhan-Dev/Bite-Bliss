import React from 'react';
import { FaCrown } from 'react-icons/fa';

const PremiumBadge = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'text-xs px-2 py-1',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-2'
    };

    return (
        <div className={`inline-flex items-center gap-1.5 bg-linear-to-r from-yellow-500 to-amber-600 text-black rounded-full font-bold ${sizes[size]} ${className}`}>
            <FaCrown className={size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm'} />
            PREMIUM
        </div>
    );
};

export default PremiumBadge;
