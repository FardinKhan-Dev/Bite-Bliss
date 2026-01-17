import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaUtensils, FaArrowRight } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-orange-900 via-red-900 to-neutral-900 relative overflow-hidden flex items-center justify-center">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating food emojis */}
                {['🍕', '🍔', '🍰', '🥗', '🍜', '🌮', '🍱'].map((emoji, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-6xl opacity-10"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: -100,
                            rotate: 0
                        }}
                        animate={{
                            y: window.innerHeight + 100,
                            rotate: 360,
                            x: Math.random() * window.innerWidth
                        }}
                        transition={{
                            duration: 15 + Math.random() * 10,
                            repeat: Infinity,
                            delay: i * 2,
                            ease: 'linear'
                        }}
                    >
                        {emoji}
                    </motion.div>
                ))}

                {/* Gradient Orbs */}
                <motion.div
                    className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.5, 0.3, 0.5]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center my-20 px-6 max-w-4xl">
                {/* 404 Number */}
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                        duration: 0.8,
                        type: 'spring',
                        bounce: 0.5
                    }}
                    className="mb-8"
                >
                    <h1 className="text-[180px] md:text-[280px] font-black leading-none bg-linear-to-br from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent select-none">
                        404
                    </h1>
                </motion.div>

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
                        Oops! Recipe Not Found
                    </h2>
                    <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto">
                        This dish seems to have vanished from our kitchen!
                        <br />
                        <span className="text-emerald-400">Let's get you back to the good stuff.</span>
                    </p>
                </motion.div>

                {/* Cooking Animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="my-12"
                >
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        className="text-8xl mb-4"
                    >
                        🍳
                    </motion.div>
                    <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        className="text-white/60 text-lg italic"
                    >
                        Still cooking up something amazing...
                    </motion.p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        to="/"
                        className="group px-8 py-4 bg-linear-to-r from-emerald-500 to-green-600 text-white rounded-full font-bold text-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-xl hover:shadow-emerald-500/50 flex items-center gap-3"
                    >
                        <FaHome className="text-xl" />
                        Back to Home
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut'
                            }}
                        >
                            <FaArrowRight />
                        </motion.span>
                    </Link>

                    <Link
                        to="/recipes"
                        className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 rounded-full font-bold text-lg hover:bg-white/20 transition-all shadow-xl flex items-center gap-3"
                    >
                        <FaUtensils className="text-xl" />
                        Browse Recipes
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 0.2
                            }}
                        >
                            <FaArrowRight />
                        </motion.span>
                    </Link>
                </motion.div>

                {/* Fun Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                >
                    {[
                        { label: 'Recipes Available', value: '100+' },
                        { label: 'Happy Cooks', value: '1K+' },
                        { label: 'Premium Content', value: '50+' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.1 }}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
                        >
                            <div className="text-3xl font-black text-emerald-400 mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-white/60">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom Wave (matching footer style) */}
            <div className="absolute bottom-0 w-full h-32">
                <svg
                    className="absolute bottom-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1440 320"
                    preserveAspectRatio="none"
                >
                    <path
                        fill="#10B981"
                        fillOpacity="0.3"
                        d="M0,224 C240,224 240,192 480,192 C720,192 720,96 960,96 C1200,96 1200,0 1440,0 L1440,320 L0,320 Z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default NotFound;
