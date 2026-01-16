import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const SubscriptionSuccess = () => {
    return (
        <div className="min-h-screen bg-linear-to-b from-neutral-900 to-black flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="inline-block mb-8"
                >
                    <FaCheckCircle className="text-8xl text-emerald-400" />
                </motion.div>

                <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
                    Welcome to Premium! 🎉
                </h1>

                <p className="text-xl text-gray-400 mb-4">
                    Your subscription is now active
                </p>

                <p className="text-gray-500 mb-12">
                    You now have full access to all premium recipes, meal planning tools, and exclusive content.
                    Start exploring and unleash your culinary creativity!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/recipes"
                        className="inline-flex items-center justify-center gap-2 bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition"
                    >
                        Browse Premium Recipes
                        <FaArrowRight />
                    </Link>
                    <Link
                        to="/account"
                        className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition"
                    >
                        Manage Subscription
                    </Link>
                </div>

                <div className="mt-16 p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <h3 className="font-bold text-white mb-2">Need Help?</h3>
                    <p className="text-gray-400 text-sm">
                        Check your email for your receipt and subscription details.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default SubscriptionSuccess;
