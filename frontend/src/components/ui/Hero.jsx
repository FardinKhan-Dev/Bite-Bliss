import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2940&auto=format&fit=crop')",
                }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-black/60 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-2xl"
                >
                    Master the Art of <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-orange-500">Cooking</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-200 mb-10 font-medium"
                >
                    Discover premium recipes, expert tips, and culinary inspiration.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="max-w-xl mx-auto"
                >
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="What do you want to cook today?"
                            className="w-full px-6 py-4 rounded-full text-lg shadow-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/30 transition-all pl-12"
                        />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400 group-focus-within:text-primary-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <button className="absolute right-2 top-2 bottom-2 px-6 bg-primary-600 text-white font-bold rounded-full hover:bg-primary-700 transition-colors">
                            Search
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
