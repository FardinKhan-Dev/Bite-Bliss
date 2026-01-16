import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { api } from '../lib/axios';
import Navbar from '../components/ui/Navbar';
import PremiumPaywall from '../components/PremiumPaywall';
import PremiumBadge from '../components/PremiumBadge';
import { useAuthStore } from '../store/useAuthStore';
import { FaClock, FaUser, FaHeart, FaShare } from 'react-icons/fa';
import Footer from '../components/ui/Footer';

export default function RecipeDetail() {
    const { slug } = useParams();
    const { user, isAuthenticated } = useAuthStore();
    const [showPaywall, setShowPaywall] = useState(false);

    const { data: recipe, isLoading, error } = useQuery({
        queryKey: ['recipe', slug],
        queryFn: async () => {
            const response = await api.get(`/recipes?filters[slug][$eq]=${slug}&populate=*`);
            return response.data.data[0];
        },
    });

    const isLocked = recipe?.isPremium && !isAuthenticated;

    if (isLoading) return (
        <div className="min-h-screen">
            <div className="max-w-6xl mx-auto px-6 py-20 animate-pulse">
                <div className="h-96 bg-white/5 rounded-3xl mb-8"></div>
                <div className="h-10 bg-white/5 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-white/5 rounded w-full mb-2"></div>
            </div>
        </div>
    );

    if (error || !recipe) return (
        <div className="min-h-screen bg-linear-to-b from-neutral-900 to-black text-white flex flex-col items-center justify-center">
            <h2 className="text-4xl font-black mb-4">Recipe Not Found</h2>
            <Link to="/" className="text-emerald-400 hover:text-emerald-300">Return Home</Link>
        </div>
    );

    return (
        <div className="min-h-screen text-white">
            <div className="relative h-[60vh] w-full overflow-hidden">
                {recipe.image?.url ? (
                    <img src={recipe.image.url} alt={recipe.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-linear-to-br from-neutral-800 to-neutral-900 flex items-center justify-center">
                        <span className="text-9xl">🍽️</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-neutral-900 via-neutral-900/50 to-transparent" />

                {recipe.isPremium && (
                    <div className="absolute top-6 right-6">
                        <PremiumBadge size="lg" />
                    </div>
                )}

                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                    <div className="max-w-6xl mx-auto">
                        {recipe.category?.name && (
                            <span className="inline-block px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-bold uppercase tracking-wider mb-4 backdrop-blur-md">
                                {recipe.category.name}
                            </span>
                        )}
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl">
                            {recipe.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-gray-300 text-lg">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                                <FaClock className="text-emerald-400" />
                                <span className="font-semibold">{recipe.cookingTime || 30} mins</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                                <FaUser className="text-emerald-400" />
                                <span className="font-semibold">{recipe.servings || 4} servings</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex gap-4 mb-12">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition">
                        <FaHeart /> Save
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-full hover:bg-white/20 transition">
                        <FaShare /> Share
                    </button>
                </div>

                {recipe.description && (
                    <div className="mb-12">
                        <p className="text-xl text-gray-400 leading-relaxed italic">{recipe.description}</p>
                    </div>
                )}

                {isLocked ? (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="relative overflow-hidden bg-linear-to-br from-neutral-800 to-neutral-900 border-2 border-emerald-500/30 rounded-3xl p-12 text-center">
                        <div className="relative">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 mb-6">
                                <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>

                            <h2 className="text-4xl font-black mb-4">Premium Recipe <PremiumBadge className="ml-2" /></h2>
                            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                                Full ingredients and step-by-step instructions are available to Premium & VIP members
                            </p>

                            <button onClick={() => setShowPaywall(true)}
                                className="bg-linear-to-r from-emerald-500 to-green-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:from-emerald-600 hover:to-green-700 transition shadow-2xl shadow-emerald-500/50">
                                Unlock This Recipe - $7.99/mo
                            </button>

                            <p className="text-sm text-gray-500 mt-4">
                                Or <Link to="/login" className="text-emerald-400 hover:text-emerald-300 underline">sign in</Link> if you're already a member
                            </p>
                        </div>
                    </motion.div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-1">
                            <h2 className="text-3xl font-black mb-6 border-b-2 border-emerald-500 pb-4">Ingredients</h2>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                {recipe.ingredients ? (
                                    <div className="prose prose-invert max-w-none">
                                        {typeof recipe.ingredients === 'string' ? recipe.ingredients : 'See ingredients in recipe'}
                                    </div>
                                ) : (
                                    <p className="text-gray-400">Ingredients list not available</p>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <h2 className="text-3xl font-black mb-6 border-b-2 border-emerald-500 pb-4">Instructions</h2>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                                {recipe.instructions ? (
                                    <div className="prose prose-invert prose-lg max-w-none">
                                        {typeof recipe.instructions === 'string' ? recipe.instructions : 'See instructions in recipe'}
                                    </div>
                                ) : (
                                    <p className="text-gray-400">Instructions not available</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showPaywall && <PremiumPaywall recipeName={recipe.title} onClose={() => setShowPaywall(false)} />}

            {/* Footer */}
            <Footer />
        </div>
    );
}
