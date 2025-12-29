import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-600">
                            Bite Bliss
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            Recipes
                        </Link>
                        <Link to="/subscription" className="text-gray-600 hover:text-primary-600 font-medium transition-colors">
                            Plans
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700">
                                    Hi, {user.username}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-bold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all hover:scale-105"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-gray-900 font-bold hover:text-primary-600 transition-colors">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-primary-600 to-amber-600 rounded-xl hover:shadow-lg hover:shadow-primary-500/30 transition-all hover:scale-105"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
