import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaCrown, FaCheck, FaArrowRight } from 'react-icons/fa';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

const Pricing = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();
    const [billingCycle, setBillingCycle] = useState('monthly');

    const { data: plansData, isLoading } = useQuery({
        queryKey: ['subscription-plans'],
        queryFn: async () => {
            const response = await api.get('/subscription-plans?populate=*');
            return response.data;
        }
    });


    const checkoutMutation = useMutation({
        mutationFn: async (priceId) => {
            const response = await api.post('/subscriptions/checkout', { priceId });
            return response.data;
        },
        onSuccess: (data) => {
            if (data.url) {
                window.location.href = data.url;
            }
        },
        onError: (error) => {
            toast.error(error.response?.data?.error?.message || 'Failed to start checkout');
        }
    });

    const plans = plansData?.data || [];
    const sortedPlans = [...plans].sort((a, b) => a.tier - b.tier);

    const handleSubscribe = (plan) => {
        if (!isAuthenticated) {
            toast.error('Please login first');
            navigate('/login?redirect=/pricing');
            return;
        }

        if (plan.tier === 0) {
            toast.success('You already have free access!');
            return;
        }

        const priceId = billingCycle === 'yearly' ? plan.stripeYearlyPriceId : plan.stripePriceId;

        if (!priceId) {
            toast.error('Price not configured. Please contact support.');
            return;
        }

        checkoutMutation.mutate(priceId);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            <div className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block mb-6 px-6 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 font-semibold"
                    >
                        💎 Choose Your Perfect Plan
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black mb-6 text-neutral-900 dark:text-white"
                    >
                        Unlock Your Culinary{' '}
                        <span className="text-emerald-500">
                            Potential
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-neutral-600 dark:text-neutral-300 mb-8"
                    >
                        From free recipes to VIP masterclasses, find the plan that fits your cooking journey
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-4 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full p-2"
                    >
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`px-6 py-2 rounded-full font-semibold transition ${billingCycle === 'monthly'
                                ? 'bg-emerald-500 text-white'
                                : 'text-neutral-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-white'
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('yearly')}
                            className={`px-6 py-2 rounded-full font-semibold transition flex items-center gap-2 ${billingCycle === 'yearly'
                                ? 'bg-emerald-500 text-white'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Yearly
                            <span className="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full">Save 17%</span>
                        </button>
                    </motion.div>
                </div>

                {isLoading ? (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
                        <p className="mt-4 text-gray-500">Loading plans...</p>
                    </div>
                ) : (
                    <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sortedPlans.map((plan, index) => {
                            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.price;
                            const monthlyPrice = billingCycle === 'yearly' ? (plan.yearlyPrice / 12).toFixed(2) : plan.price;
                            const isPremium = plan.tier === 1;
                            const isVIP = plan.tier === 2;

                            return (
                                <motion.div
                                    key={plan.id || plan.documentId}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative p-8 rounded-3xl border ${isPremium
                                        ? 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-500/50 transform md:scale-105'
                                        : isVIP
                                            ? 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-yellow-500/30'
                                            : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
                                        } ${index === 0
                                            ? "md:col-start-2 absolute md:right-1/2 lg:col-start-1 lg:right-0"
                                            : ""}`}
                                >
                                    {isPremium && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                                            MOST POPULAR
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2 text-neutral-900 dark:text-white">
                                            {plan.name}
                                            {isVIP && <FaCrown className="text-yellow-400" />}
                                        </h3>
                                        <p className="text-neutral-600 dark:text-gray-400 text-sm mb-6">{plan.description}</p>

                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-black text-neutral-900 dark:text-white">${price}</span>
                                            <span className="text-neutral-600 dark:text-gray-400">
                                                {billingCycle === 'yearly' ? '/year' : '/month'}
                                            </span>
                                        </div>
                                        {billingCycle === 'yearly' && price > 0 && (
                                            <p className="text-sm text-emerald-400 mt-2">
                                                ${monthlyPrice}/month billed annually
                                            </p>
                                        )}
                                    </div>

                                    <ul className="space-y-4 mb-8">
                                        {plan.features?.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <FaCheck className={`text-lg mt-0.5 shrink-0 ${isVIP ? 'text-yellow-400' : isPremium ? 'text-emerald-400' : 'text-gray-400'
                                                    }`} />
                                                <span className="text-sm text-neutral-700 dark:text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => handleSubscribe(plan)}
                                        disabled={checkoutMutation.isPending}
                                        className={`w-full py-4 rounded-full font-bold text-lg transition flex items-center justify-center gap-2 ${isPremium
                                            ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                            : isVIP
                                                ? 'bg-linear-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-400 hover:to-amber-500'
                                                : 'bg-neutral-100 dark:bg-white/10 border border-neutral-300 dark:border-white/20 text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-white/20'
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {checkoutMutation.isPending ? (
                                            <>Processing...</>
                                        ) : plan.tier === 0 ? (
                                            <>Get Started Free <FaArrowRight /></>
                                        ) : (
                                            <>Subscribe Now <FaArrowRight /></>
                                        )}
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Pricing;
