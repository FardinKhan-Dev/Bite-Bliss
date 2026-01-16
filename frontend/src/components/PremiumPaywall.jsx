import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaCrown, FaArrowRight } from 'react-icons/fa';

const PremiumPaywall = ({ recipeName, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-6"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full bg-linear-to-br from-neutral-900 to-black border-2 border-emerald-500/30 rounded-3xl p-8 md:p-12 text-center"
            >
                {/* Lock Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6">
                    <FaLock className="text-4xl text-emerald-400" />
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                    Premium Recipe <FaCrown className="inline text-yellow-400" />
                </h2>

                <p className="text-xl text-gray-400 mb-8">
                    <span className="text-emerald-400 font-semibold">{recipeName}</span> is a premium recipe
                </p>

                {/* Benefits */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
                    <h3 className="font-bold text-lg text-white mb-4">Unlock with Premium:</h3>
                    <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-400 text-xl">✓</span>
                            <span>Access to <strong>500+ premium recipes</strong></span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-400 text-xl">✓</span>
                            <span><strong>Ad-free</strong> cooking experience</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-400 text-xl">✓</span>
                            <span><strong>Meal planning</strong> & shopping lists</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-emerald-400 text-xl">✓</span>
                            <span>Save <strong>unlimited favorites</strong></span>
                        </li>
                    </ul>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <span className="text-5xl font-black text-white">$7.99</span>
                    <span className="text-gray-400">/month</span>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        to="/pricing"
                        className="flex-1 bg-linear-to-r from-emerald-500 to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-emerald-600 hover:to-green-700 transition flex items-center justify-center gap-2 group"
                    >
                        Upgrade to Premium
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <button
                        onClick={onClose}
                        className="flex-1 bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition"
                    >
                        Maybe Later
                    </button>
                </div>

                {/* Footer Note */}
                <p className="text-sm text-gray-500 mt-6">
                    Cancel anytime. No commitments.
                </p>
            </motion.div>
        </motion.div>
    );
};

export default PremiumPaywall;
