import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLeaf } from 'react-icons/fa';

const Footer = () => {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    return (
        <footer className={`relative ${isHomePage ? '' : 'bg-white dark:bg-neutral-900'}`}>
            <div className="relative pt-12 pb-12 px-8 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <FaLeaf className="text-emerald-500 text-2xl" />
                                <h3 className="text-2xl text-emerald-500">Bite Bliss.</h3>
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                                Fresh recipes, healthy living.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-neutral-900 dark:text-white">Recipes</h4>
                            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm font-semibold">
                                <li><Link to="/recipes" className="hover:text-emerald-500 transition">Browse All</Link></li>
                                <li><Link to="/recipes?category=dinner" className="hover:text-emerald-500 transition">Dinner</Link></li>
                                <li><Link to="/recipes?category=dessert" className="hover:text-emerald-500 transition">Dessert</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-neutral-900 dark:text-white">Account</h4>
                            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm font-semibold">
                                <li><Link to="/login" className="hover:text-emerald-500 transition">Login</Link></li>
                                <li><Link to="/register" className="hover:text-emerald-500 transition">Sign Up</Link></li>
                                <li><Link to="/pricing" className="hover:text-emerald-500 transition">Pricing</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4 text-neutral-900 dark:text-white">Support</h4>
                            <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 text-sm font-semibold">
                                <li><a href="mailto:support@bitebliss.com" className="hover:text-emerald-500 transition">Contact</a></li>
                                <li><Link to="/help" className="hover:text-emerald-500 transition">Help Center</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t-2 border-neutral-300 dark:border-neutral-700 pt-8 text-center text-neutral-900 dark:text-neutral-400 text-sm font-semibold">
                        <p>© {new Date().getFullYear()} Bite Bliss. All rights reserved.</p>
                    </div>
                </div>
            </div>
            {/* Three-Layer Diagonal Stepping Waves */}
            <div className="absolute bottom-0 w-full h-32 md:h-full">
                {/* Layer 1 - Bottom Layer (starts lowest on left, reaches middle-low on right) */}
                <svg
                    className="absolute bottom-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#059669"
                        fillOpacity="1"
                        d="M0,288 C240,288 240,256 480,256 C720,256 720,224 960,224 C1200,224 1200,192 1440,192 L1440,320 L0,320 Z"
                    />
                </svg>

                {/* Layer 2 - Middle Layer (starts low on left, reaches middle-high on right) */}
                <svg
                    className="absolute bottom-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#10B981"
                        fillOpacity="0.8"
                        d="M0,256 C240,256 240,224 480,224 C720,224 720,160 960,160 C1200,160 1200,96 1440,96 L1440,320 L0,320 Z"
                    />
                </svg>

                {/* Layer 3 - Top Layer (starts bottom on left, reaches top on right) */}
                <svg
                    className="absolute bottom-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#34D399"
                        fillOpacity="0.6"
                        d="M0,224 C240,224 240,192 480,192 C720,192 720,96 960,96 C1200,96 1200,0 1440,0 L1440,320 L0,320 Z"
                    />
                </svg>
            </div>
        </footer>
    );
};

export default Footer;
