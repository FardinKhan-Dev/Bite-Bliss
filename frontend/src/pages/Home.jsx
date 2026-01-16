import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaLeaf, FaQuoteLeft, FaSearch, FaCalendarAlt, FaUserTie, FaBullseye, FaHeart, FaStar } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/axios';
import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';
import ScrollytellingHero from '../components/ScrollytellingHero';

const Home = () => {
    const { data: recipesData, isLoading } = useQuery({
        queryKey: ['featured-recipes'],
        queryFn: async () => {
            const response = await api.get('/recipes?populate=*&pagination[limit]=6');
            return response.data;
        }
    });

    const recipes = recipesData?.data || [];

    return (
        <div className="relative min-h-screen">
            {/* Scrollytelling Hero Section - Full Screen */}
            
            <ScrollytellingHero />

            {/* Rest of page content */}
            <div className="overflow-x-hidden">
                {/* Hero Section - Fresh & Green Style */}
                <section className="relative h-full flex items-center pt-24 xl:pt-0">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="grid xl:grid-cols-2 gap-8 xl:gap-16 items-center">
                            {/* Left: Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="z-10"
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-full mb-6"
                                >
                                    <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">🌿 100% Organic Recipes</span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6 text-neutral-900 dark:text-white"
                                >
                                    FRESH<br />
                                    <span className="text-emerald-500">&</span>GREEN
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8 max-w-lg"
                                >
                                    Discover chef-curated recipes made with the freshest ingredients. From quick weeknight dinners to weekend culinary adventures.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex flex-wrap gap-4"
                                >
                                    <Link
                                        to="/recipes"
                                        className="group bg-emerald-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/30 flex items-center gap-2"
                                    >
                                        EXPLORE RECIPES
                                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link
                                        to="/pricing"
                                        className="bg-white dark:bg-neutral-800 text-emerald-600 dark:text-emerald-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base border-2 border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition"
                                    >
                                        VIEW PRICING
                                    </Link>
                                </motion.div>
                            </motion.div>

                            {/* Right: Food Image with Blob & Floating Elements */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="relative h-[350px] sm:h-[700px] lg:h-[850px] xl:h-[770px] flex items-center justify-center"
                            >
                                {/* Organic Blob Shape */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <svg viewBox="0 0 600 600" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill="#10B981"
                                            d="M46.2,-13C54.8,11.5,53.3,41.4,39.9,49.9C26.5,58.5,1.2,45.8,-19.2,30.1C-39.7,14.4,-55.3,-4.3,-51.3,-22.5C-47.3,-40.7,-23.7,-58.3,-2.4,-57.5C18.8,-56.8,37.6,-37.5,46.2,-13Z"
                                            transform="translate(300 300) scale(6) rotate(90)"
                                        />
                                    </svg>
                                </div>


                                {/* Main Food Image - Bowl */}
                                <div className="relative z-10">
                                    <img
                                        src="./Bite Bliss Hero Section Image.png"
                                        alt="Healthy Bowl"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features Section - REDESIGNED */}
                <section className="relative py-16 px-8">
                    {/* Large Decorative Blob */}
                    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] opacity-10">
                        <svg viewBox="0 0 500 500">
                            <path
                                d="M400,250 C400,350 350,400 250,400 C150,400 100,350 100,250 C100,150 150,100 250,100 C350,100 400,150 400,250 Z"
                                fill="#8CB755"
                            />
                        </svg>
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center mb-20">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="inline-block px-6 py-2 bg-emerald-50 dark:bg-emerald-900/30 rounded-full mb-6"
                            >
                                <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">✨ WHY CHOOSE US</span>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-5xl md:text-6xl font-black mb-6"
                            >
                                Everything You<br />Need to <span className="text-emerald-500">Cook Better</span>
                            </motion.h2>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    number: '01',
                                    icon: FaSearch,
                                    title: 'Smart Search',
                                    description: 'Find your perfect recipe in seconds with advanced filters'
                                },
                                {
                                    number: '02',
                                    icon: FaCalendarAlt,
                                    title: 'Meal Planning',
                                    description: 'Plan your weekly meals and auto-generate shopping lists'
                                },
                                {
                                    number: '03',
                                    icon: FaUserTie,
                                    title: 'Expert Chefs',
                                    description: 'Learn from professionals with exclusive masterclasses'
                                },
                                {
                                    number: '04',
                                    icon: FaBullseye,
                                    title: 'Ad-Free',
                                    description: 'Enjoy cooking without any interruptions or distractions'
                                },
                                {
                                    number: '05',
                                    icon: FaHeart,
                                    title: 'Save Favorites',
                                    description: 'Build your personal recipe library accessible anywhere'
                                },
                                {
                                    number: '06',
                                    icon: FaStar,
                                    title: 'Community',
                                    description: 'Join 500K+ cooks sharing tips and reviews'
                                }
                            ].map((feature, i) => (
                                <motion.div
                                    key={feature.number}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group relative bg-neutral-50 dark:bg-neutral-800 p-8 rounded-3xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-300"
                                >
                                    <div className="absolute top-6 right-6 text-7xl font-black text-emerald-500/10 group-hover:text-emerald-500/20 transition">
                                        {feature.number}
                                    </div>

                                    <feature.icon className="text-5xl mb-4 text-emerald-500" />
                                    <h3 className="text-xl font-black mb-3 text-neutral-900 dark:text-white">{feature.title}</h3>
                                    <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section - NEW */}
                <section className="py-16 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-20">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-5xl md:text-6xl font-black mb-6"
                            >
                                How It <span className="text-emerald-500">Works</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-xl text-neutral-600"
                            >
                                Get started in 3 simple steps
                            </motion.p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    step: '1',
                                    title: 'Create Account',
                                    description: 'Sign up for free and explore our collection of delicious recipes',
                                    color: 'emerald'
                                },
                                {
                                    step: '2',
                                    title: 'Choose Your Plan',
                                    description: 'Pick the perfect plan for your cooking journey - upgrade anytime',
                                    color: 'lime'
                                },
                                {
                                    step: '3',
                                    title: 'Start Cooking',
                                    description: 'Access premium recipes, meal plans, and join our cooking community',
                                    color: 'green'
                                }
                            ].map((step, i) => (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="relative text-center"
                                >
                                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-emerald-500 text-white text-3xl font-black rounded-full">
                                        {step.step}
                                    </div>
                                    <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                                    <p className="text-neutral-600 leading-relaxed">{step.description}</p>

                                    {i < 2 && (
                                        <div className="hidden md:block absolute top-10 right-0 transform translate-x-1/2">
                                            <FaArrowRight className="text-emerald-300 text-2xl" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Recipes Section */}
                <section className="py-22 px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
                            <div>
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-5xl font-black mb-4 text-neutral-900 dark:text-white"
                                >
                                    Fresh from the Kitchen
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="text-xl text-neutral-600 dark:text-neutral-300"
                                >
                                    Latest chef-curated recipes
                                </motion.p>
                            </div>
                            <Link
                                to="/recipes"
                                className="mt-6 md:mt-0 text-emerald-500 hover:text-emerald-600 flex items-center gap-2 text-lg font-bold group"
                            >
                                View All
                                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>

                        {isLoading ? (
                            <div className="text-center py-20">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-emerald-500"></div>
                            </div>
                        ) : recipes.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {recipes.map((recipe, i) => (
                                    <Link
                                        to={`/recipe/${recipe.slug}`}
                                        key={recipe.id || recipe.documentId}
                                        className="group"
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="bg-white border-2 border-neutral-100 rounded-3xl overflow-hidden hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300"
                                        >
                                            <div className="relative h-72 overflow-hidden">
                                                {recipe.image?.url ? (
                                                    <img
                                                        src={recipe.image.url}
                                                        alt={recipe.title}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-linear-to-br from-emerald-100 to-lime-100 flex items-center justify-center">
                                                        <span className="text-7xl">🍽️</span>
                                                    </div>
                                                )}
                                                {recipe.isPremium && (
                                                    <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-2 rounded-full text-xs font-bold">
                                                        PREMIUM
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6">
                                                {recipe.category?.name && (
                                                    <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
                                                        {recipe.category.name}
                                                    </span>
                                                )}
                                                <h3 className="text-2xl font-black mt-2 mb-3 group-hover:text-emerald-500 transition-colors">
                                                    {recipe.title}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-neutral-500 font-semibold">
                                                    <span>⏱️ {recipe.cookingTime || 30} mins</span>
                                                    <span>•</span>
                                                    <span>🍽️ {recipe.servings || 4} servings</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </section>

                {/* Testimonials Section - NEW */}
                <section className="max-w-7xl mx-auto py-32 px-8 rounded-[3rem] bg-emerald-500 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-10">
                        <svg className="w-full h-full" viewBox="0 0 800 600">
                            <path
                                d="M600,300 C600,450 500,550 350,550 C200,550 100,450 100,300 C100,150 200,50 350,50 C500,50 600,150 600,300 Z"
                                fill="white"
                            />
                        </svg>
                    </div>

                    <div className="max-w-5xl mx-auto relative z-10">
                        <div className="text-center mb-16">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-5xl md:text-6xl font-black mb-6"
                            >
                                Loved by Home Cooks
                            </motion.h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    quote: "Bite Bliss transformed my cooking! The meal planning feature saves me hours every week.",
                                    author: "Sarah M.",
                                    role: "Premium Member"
                                },
                                {
                                    quote: "The quality of recipes is outstanding. I've impressed my family with dishes I never thought I could make!",
                                    author: "Michael T.",
                                    role: "Chef's Circle"
                                },
                                {
                                    quote: "Finally, an ad-free cooking experience! The search feature helps me find exactly what I need.",
                                    author: "Jennifer L.",
                                    role: "Premium Member"
                                }
                            ].map((testimonial, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl"
                                >
                                    <FaQuoteLeft className="text-3xl mb-4 opacity-50" />
                                    <p className="text-lg mb-6 leading-relaxed">{testimonial.quote}</p>
                                    <div className="border-t border-white/20 pt-4">
                                        <p className="font-bold">{testimonial.author}</p>
                                        <p className="text-sm opacity-75">{testimonial.role}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-32 px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-emerald-500 text-white rounded-[3rem] p-12 md:p-16 shadow-2xl"
                        >
                            <h2 className="text-5xl md:text-6xl font-black mb-6">
                                Ready to Cook?
                            </h2>
                            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                                Join 500,000+ home cooks discovering new recipes every day
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/register"
                                    className="px-10 py-4 bg-white text-emerald-600 rounded-full font-bold text-lg hover:bg-neutral-100 transition shadow-lg"
                                >
                                    Start Free Today
                                </Link>
                                <Link
                                    to="/pricing"
                                    className="px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition"
                                >
                                    View Plans
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
