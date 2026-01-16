import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLeaf, FaMoon, FaSun, FaBars, FaTimes, FaUser, FaSignOutAlt, FaCrown } from 'react-icons/fa';
import { useState } from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';

export default function Navbar() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { isDarkMode, toggleDarkMode } = useDarkMode();

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate('/');
    };

    return (
        <nav className="fixed top-0 w-full z-50 px-4 sm:px-6 py-4 flex justify-between items-center backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-100 dark:border-neutral-800">
            <Link to="/" className="flex items-center gap-2">
                <FaLeaf className="text-primary text-2xl" />
                <h1 className="text-xl sm:text-2xl font-display font-bold text-primary tracking-tight">Bite Bliss.</h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                <Link to="/recipes" className="hover:text-primary transition-colors">Recipes</Link>
                <Link to="/pricing" className="hover:text-primary transition-colors">Plans</Link>
                <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    aria-label="Toggle dark mode"
                >
                    {isDarkMode ? (
                        <FaSun className="text-yellow-400 text-lg sm:text-xl" />
                    ) : (
                        <FaMoon className="text-neutral-700 dark:text-neutral-300 text-lg sm:text-xl" />
                    )}
                </button>

                {/* Auth Buttons or User Menu */}
                {user ? (
                    <div className="relative hidden md:block">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                        >
                            <FaUser className="text-sm" />
                            <span className="text-sm font-semibold">{user.username}</span>
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 py-2"
                                >
                                    <Link
                                        to="/account"
                                        onClick={() => setIsProfileOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                                    >
                                        <FaUser /> My Account
                                    </Link>
                                    <Link
                                        to="/pricing"
                                        onClick={() => setIsProfileOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                                    >
                                        <FaCrown /> Subscription
                                    </Link>
                                    <hr className="my-2 border-neutral-200 dark:border-neutral-700" />
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                                    >
                                        <FaSignOutAlt /> Sign Out
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="hidden md:block text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-primary transition-colors">
                            Log in
                        </Link>
                        <Link to="/register" className="hidden md:block bg-primary text-white px-4 sm:px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-900/20">
                            Sign Up
                        </Link>
                    </>
                )}

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <FaTimes className="text-xl text-neutral-900 dark:text-neutral-100" />
                    ) : (
                        <FaBars className="text-xl text-neutral-900 dark:text-neutral-100" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700 md:hidden"
                    >
                        <div className="px-4 py-6 space-y-4">
                            <Link
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-neutral-900 dark:text-neutral-100 hover:text-primary transition-colors font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                to="/recipes"
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-neutral-900 dark:text-neutral-100 hover:text-primary transition-colors font-medium"
                            >
                                Recipes
                            </Link>
                            <Link
                                to="/pricing"
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-neutral-900 dark:text-neutral-100 hover:text-primary transition-colors font-medium"
                            >
                                Plans
                            </Link>
                            <Link
                                to="/blog"
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-neutral-900 dark:text-neutral-100 hover:text-primary transition-colors font-medium"
                            >
                                Blog
                            </Link>

                            <hr className="border-neutral-200 dark:border-neutral-700" />

                            {user ? (
                                <>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg">
                                        <FaUser className="text-emerald-600 dark:text-emerald-400" />
                                        <span className="font-semibold text-neutral-900 dark:text-white">{user.username}</span>
                                    </div>
                                    <Link
                                        to="/account"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-neutral-900 dark:text-neutral-100 hover:text-primary transition-colors font-medium"
                                    >
                                        My Account
                                    </Link>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-left text-red-600 dark:text-red-400 hover:text-red-700 transition-colors font-medium"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-center bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-4 py-2 rounded-full font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block text-center bg-primary text-white px-4 py-2 rounded-full font-semibold hover:bg-emerald-600 transition-all"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
