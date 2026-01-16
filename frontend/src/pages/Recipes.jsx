import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaTimes, FaClock, FaUtensils } from 'react-icons/fa';
import { api } from '../lib/axios';
import Navbar from '../components/ui/Navbar';
import PremiumBadge from '../components/PremiumBadge';
import Footer from '../components/ui/Footer';

const Recipes = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [showFilters, setShowFilters] = useState(false);

    const currentFilters = {
        q: searchParams.get('q') || '',
        category: searchParams.get('category') || '',
        maxCookingTime: searchParams.get('maxCookingTime') || '',
        page: searchParams.get('page') || '1',
    };

    const { data: recipesData, isLoading } = useQuery({
        queryKey: ['recipes-search', currentFilters],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (currentFilters.q) params.append('q', currentFilters.q);
            if (currentFilters.category) params.append('category', currentFilters.category);
            if (currentFilters.maxCookingTime) params.append('maxCookingTime', currentFilters.maxCookingTime);
            params.append('page', currentFilters.page);
            params.append('pageSize', '12');

            const response = await api.get(`/recipes/search?${params.toString()}`);
            return response.data;
        },
    });

    const { data: filtersData } = useQuery({
        queryKey: ['recipe-filters'],
        queryFn: async () => {
            const response = await api.get('/recipes/filters');
            return response.data;
        },
    });

    const recipes = recipesData?.data || [];
    const pagination = recipesData?.meta?.pagination || {};
    const categories = filtersData?.categories || [];

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        if (searchQuery) {
            params.set('q', searchQuery);
        } else {
            params.delete('q');
        }
        params.set('page', '1');
        setSearchParams(params);
    };

    const handleFilterChange = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        params.set('page', '1');
        setSearchParams(params);
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSearchParams({});
    };

    const activeFilterCount = [currentFilters.q, currentFilters.category, currentFilters.maxCookingTime].filter(Boolean).length;

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 text-neutral-900 dark:text-white">Discover Recipes</h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-300">Search from over 1000+ delicious recipes</p>
                </motion.div>

                <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    onSubmit={handleSearch} className="mb-8">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 text-xl" />
                            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search recipes by name, ingredient..."
                                className="w-full pl-16 pr-6 py-5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full text-lg text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 transition"
                            />
                        </div>
                        <button type="submit"
                            className="px-8 py-5 bg-emerald-500 hover:bg-emerald-600 rounded-full font-bold transition">
                            Search
                        </button>
                        <button type="button" onClick={() => setShowFilters(!showFilters)}
                            className="px-6 py-5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition flex items-center gap-2 text-neutral-900 dark:text-white">
                            <FaFilter /> Filters
                            {activeFilterCount > 0 && (
                                <span className="bg-emerald-500 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                    </div>
                </motion.form>

                {showFilters && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="mb-8 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-3xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Filter Results</h3>
                            {activeFilterCount > 0 && (
                                <button onClick={clearFilters}
                                    className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-2">
                                    <FaTimes /> Clear All
                                </button>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold mb-3 text-neutral-600 dark:text-neutral-400">Category</label>
                                <select value={currentFilters.category} onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full px-4 py-3 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500 transition">
                                    <option value="">All Categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-3 text-neutral-600 dark:text-neutral-400">Max Cooking Time</label>
                                <select value={currentFilters.maxCookingTime} onChange={(e) => handleFilterChange('maxCookingTime', e.target.value)}
                                    className="w-full px-4 py-3 bg-white dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500 transition">
                                    <option value="">Any Duration</option>
                                    <option value="15">Under 15 mins</option>
                                    <option value="30">Under 30 mins</option>
                                    <option value="45">Under 45 mins</option>
                                    <option value="60">Under 1 hour</option>
                                    <option value="90">Under 1.5 hours</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeFilterCount > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {currentFilters.q && (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-sm">
                                Search: "{currentFilters.q}"
                                <button onClick={() => handleFilterChange('q', '')}><FaTimes /></button>
                            </span>
                        )}
                        {currentFilters.category && (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-sm">
                                Category: {currentFilters.category}
                                <button onClick={() => handleFilterChange('category', '')}><FaTimes /></button>
                            </span>
                        )}
                        {currentFilters.maxCookingTime && (
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-sm">
                                Under {currentFilters.maxCookingTime} mins
                                <button onClick={() => handleFilterChange('maxCookingTime', '')}><FaTimes /></button>
                            </span>
                        )}
                    </div>
                )}

                {!isLoading && (
                    <div className="mb-6 text-neutral-600 dark:text-gray-400">
                        Found <span className="text-neutral-900 dark:text-white font-bold">{pagination.total || 0}</span> recipes
                    </div>
                )}

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="h-64 bg-neutral-50 dark:bg-white/5 rounded-3xl border border-neutral-200 dark:border-white/10 mb-4"></div>
                                <div className="h-6 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : recipes.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recipes.map((recipe, i) => (
                                <Link to={`/recipe/${recipe.slug}`} key={recipe.id || recipe.documentId} className="group">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                                        className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 h-full">
                                        <div className="relative h-64 overflow-hidden">
                                            {recipe.image?.url ? (
                                                <img src={recipe.image.url} alt={recipe.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full bg-linear-to-br from-emerald-900 to-neutral-800 flex items-center justify-center">
                                                    <span className="text-6xl">🍽️</span>
                                                </div>
                                            )}
                                            {recipe.isPremium && (
                                                <div className="absolute top-4 right-4"><PremiumBadge /></div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            {recipe.category?.name && (
                                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                                                    {recipe.category.name}
                                                </span>
                                            )}
                                            <h3 className="text-2xl font-bold mt-2 mb-3 text-neutral-900 dark:text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                                                {recipe.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                                                <span className="flex items-center gap-1">
                                                    <FaClock className="text-emerald-400" /> {recipe.cookingTime || 30} mins
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaUtensils className="text-emerald-400" /> {recipe.servings || 4} servings
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>

                        {pagination.pageCount > 1 && (
                            <div className="mt-12 flex justify-center gap-2">
                                {pagination.page > 1 && (
                                    <button onClick={() => handleFilterChange('page', String(pagination.page - 1))}
                                        className="px-6 py-3 bg-neutral-100 dark:bg-white/10 border border-neutral-300 dark:border-white/20 rounded-full hover:bg-neutral-200 dark:hover:bg-white/20 transition text-neutral-900 dark:text-white">
                                        Previous
                                    </button>
                                )}
                                <span className="px-6 py-3 bg-emerald-50 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-500/30 rounded-full text-neutral-900 dark:text-white">
                                    Page {pagination.page} of {pagination.pageCount}
                                </span>
                                {pagination.page < pagination.pageCount && (
                                    <button onClick={() => handleFilterChange('page', String(pagination.page + 1))}
                                        className="px-6 py-3 bg-neutral-100 dark:bg-white/10 border border-neutral-300 dark:border-white/20 rounded-full hover:bg-neutral-200 dark:hover:bg-white/20 transition text-neutral-900 dark:text-white">
                                        Next
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20 bg-neutral-50 dark:bg-white/5 rounded-3xl border border-neutral-200 dark:border-white/10">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">No Recipes Found</h3>
                        <p className="text-neutral-600 dark:text-gray-400 mb-6">Try adjusting your search or filters</p>
                        <button onClick={clearFilters}
                            className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-full font-bold transition">
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Recipes;
