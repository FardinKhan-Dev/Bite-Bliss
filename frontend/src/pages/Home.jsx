import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaSearch } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
// import { useGetRecipesQuery } from '../redux/services/api'; // Adapted to useQuery locally/mock for now

const Home = () => {
    // const { data: recipes, isLoading } = useGetRecipesQuery({ limit: 3 });
    // Mocking data/loading for design preview until API hook is ready
    const isLoading = false;
    const recipes = {
        docs: [
            { id: 1, title: 'Spicy Basil Chicken', slug: 'spicy-basil-chicken', category: 'Dinner', prepTime: 25, image: { url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=80&w=1000' }, author: { email: 'chef@bitebliss.com' } },
            { id: 2, title: 'Creamy Mushroom Pasta', slug: 'creamy-mushroom-pasta', category: 'Lunch', prepTime: 30, image: { url: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&q=80&w=1000' }, author: { email: 'mario@bitebliss.com' } },
            { id: 3, title: 'Berry Smoothie Bowl', slug: 'berry-smoothie-bowl', category: 'Breakfast', prepTime: 10, image: { url: 'https://images.unsplash.com/photo-1626078299034-7bb4e1c15ab2?auto=format&fit=crop&q=80&w=1000' }, author: { email: 'anna@bitebliss.com' } },
        ]
    };

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Navbar (Glassmorphism) */}
            <nav className="fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center backdrop-blur-md bg-black/30 border-b border-white/5">
                <h1 className="text-2xl font-display font-bold text-primary tracking-tight">Bite Bliss.</h1>

                <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <Link to="/recipes" className="hover:text-primary transition-colors">Recipes</Link>
                    <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Log in
                    </Link>
                    <Link to="/register" className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-900/20">
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center pt-20">
                {/* Background Gradient/Image */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-background to-background z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2070&auto=format&fit=crop"
                        alt="Hero Food"
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>

                <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight"
                    >
                        Taste the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">Extraordinary</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
                    >
                        Discover premium recipes, master culinary skills, and join a community of passionate food lovers.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col md:flex-row gap-4 justify-center"
                    >
                        <Link to="/recipes" className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 group">
                            Explore Recipes <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/register" className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg border border-white/10 hover:bg-white/20 transition-all">
                            Join for Free
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Recipes Preview */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h3 className="text-3xl font-display font-bold mb-2">Fresh from the Kitchen</h3>
                        <p className="text-gray-400">Latest creations by our master chefs</p>
                    </div>
                    <Link to="/recipes" className="text-primary hover:text-emerald-400 flex items-center gap-2">View all <FaArrowRight /></Link>
                </div>

                {isLoading ? (
                    <div className="text-center py-20 text-gray-500">Loading deliciousness...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {recipes?.docs?.map((recipe, i) => (
                            <Link to={`/recipe/${recipe.slug}`} key={recipe.id} className="group">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden hover:border-primary/50 transition-colors h-full"
                                >
                                    <div className="aspect-w-4 aspect-h-3 overflow-hidden h-64">
                                        {recipe.image?.url ? (
                                            <img src={recipe.image.url} alt={recipe.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">No Image</div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">{recipe.category || 'Recipe'}</span>
                                        <h4 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{recipe.title}</h4>
                                        <div className="flex gap-4 text-sm text-gray-400">
                                            <span>{recipe.prepTime}m Prep</span>
                                            <span>•</span>
                                            <span>{recipe.author?.email || 'Chef'}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
