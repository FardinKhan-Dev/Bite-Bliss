import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCrown, FaSignOutAlt, FaCreditCard, FaArrowRight, FaCheck, FaFire, FaBook, FaHeart, FaUser, FaCog, FaCamera, FaLock, FaBell, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';
import { useAuthStore } from '../store/useAuthStore';
import { useDarkMode } from '../hooks/useDarkMode';
import { api } from '../lib/axios';
import toast from 'react-hot-toast';

const Account = () => {
    const { user, isAuthenticated, logout, setUser } = useAuthStore();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    const queryClient = useQueryClient();
    const [activeTab, setActiveTab] = useState('overview');

    // Edit mode states
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    // Form states
    const [username, setUsername] = useState(user?.username || '');
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || '');

    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        newsletter: true
    });

    const { data: subscriptionData, isLoading } = useQuery({
        queryKey: ['my-subscription'],
        queryFn: async () => {
            const response = await api.get('/subscriptions/me');
            return response.data;
        },
        enabled: isAuthenticated,
    });

    const portalMutation = useMutation({
        mutationFn: async () => {
            const response = await api.post('/subscriptions/portal');
            return response.data;
        },
        onSuccess: (data) => {
            if (data.url) {
                window.location.href = data.url;
            }
        },
        onError: (error) => {
            toast.error(error.response?.data?.error?.message || 'Failed to open billing portal');
        }
    });

    const updateProfileMutation = useMutation({
        mutationFn: async ({ username, avatar }) => {
            const formData = new FormData();
            formData.append('data', JSON.stringify({ username }));
            if (avatar) {
                formData.append('files.avatar', avatar);
            }
            const response = await api.put('/users/me', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            return response.data;
        },
        onSuccess: (data) => {
            setUser(data);
            toast.success('Profile updated successfully!');
            setIsEditingProfile(false);
            queryClient.invalidateQueries(['my-profile']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error?.message || 'Failed to update profile');
        }
    });

    const updatePasswordMutation = useMutation({
        mutationFn: async (data) => {
            const response = await api.post('/auth/change-password', data);
            return response.data;
        },
        onSuccess: () => {
            toast.success('Password changed successfully!');
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setIsChangingPassword(false);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error?.message || 'Failed to change password');
        }
    });

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleProfileSave = () => {
        updateProfileMutation.mutate({ username, avatar });
    };

    const handlePasswordChange = () => {
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
        if (passwordForm.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters!');
            return;
        }
        updatePasswordMutation.mutate({
            currentPassword: passwordForm.currentPassword,
            password: passwordForm.newPassword
        });
    };

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const subscription = subscriptionData?.subscription;
    const plan = subscription?.plan;
    const isPremium = plan?.tier > 0;

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                {/* Premium Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6">
                        <FaFire className="text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">YOUR ACCOUNT</span>
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black mb-4 bg-linear-to-r from-neutral-900 via-emerald-700 to-emerald-500 dark:from-white dark:via-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent">
                        Welcome Back
                    </h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400">Manage your culinary journey</p>
                </motion.div>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all ${activeTab === 'overview'
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                            }`}
                    >
                        <FaUser /> Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all ${activeTab === 'settings'
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                            }`}
                    >
                        <FaCog /> Settings
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'overview' ? (
                        /* OVERVIEW TAB */
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="grid lg:grid-cols-3 gap-8"
                        >
                            {/* Left Column - Profile */}
                            <div className="lg:col-span-1 space-y-6">
                                {/* Profile Card */}
                                <div className="relative overflow-hidden bg-linear-to-br from-emerald-500 to-green-600 rounded-3xl p-8 text-white shadow-2xl shadow-emerald-500/30">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                                    <div className="relative z-10">
                                        <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl font-black mb-4 border-4 border-white/30">
                                            {avatarPreview ? (
                                                <img src={avatarPreview} alt={user?.username} className="w-full h-full rounded-full object-cover" />
                                            ) : (
                                                user?.username?.charAt(0).toUpperCase() || 'U'
                                            )}
                                        </div>
                                        <h2 className="text-2xl font-black mb-1">{user?.username}</h2>
                                        <p className="text-white/80 text-sm mb-6">{user?.email}</p>

                                        {isPremium && (
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
                                                <FaCrown className="text-yellow-300" />
                                                <span className="font-bold text-sm">Premium Member</span>
                                            </div>
                                        )}

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full hover:bg-white/20 transition font-semibold"
                                        >
                                            <FaSignOutAlt /> Sign Out
                                        </button>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="bg-white dark:bg-neutral-800 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-700 shadow-lg">
                                    <h3 className="font-black text-lg mb-4 text-neutral-900 dark:text-white">Quick Stats</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                                                    <FaHeart className="text-red-500" />
                                                </div>
                                                <span className="text-neutral-600 dark:text-neutral-400 text-sm">Saved Recipes</span>
                                            </div>
                                            <span className="font-black text-xl text-neutral-900 dark:text-white">0</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                                    <FaBook className="text-emerald-500" />
                                                </div>
                                                <span className="text-neutral-600 dark:text-neutral-400 text-sm">Member Since</span>
                                            </div>
                                            <span className="font-bold text-neutral-900 dark:text-white text-sm">
                                                {user?.createdAt
                                                    ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                                                    : 'N/A'
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Subscription (same as before) */}
                            <div className="lg:col-span-2">
                                <div className={`relative overflow-hidden rounded-3xl p-8 shadow-2xl border-2 ${plan?.tier === 2
                                    ? 'bg-linear-to-br from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/20 border-yellow-400/50'
                                    : isPremium
                                        ? 'bg-linear-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/20 border-emerald-400/50'
                                        : 'bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
                                    }`}>
                                    {isPremium && (
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-white/50 to-transparent rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
                                    )}

                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-8">
                                            <div>
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h2 className="text-4xl font-black text-neutral-900 dark:text-white">
                                                        {plan?.name || 'Free Reader'}
                                                    </h2>
                                                    {plan?.tier === 2 && <FaCrown className="text-yellow-500 text-2xl" />}
                                                </div>
                                                {subscription?.status && (
                                                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold ${subscription.status === 'active'
                                                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                                        : 'bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30'
                                                        }`}>
                                                        {subscription.status.toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            {isPremium && (
                                                <div className="text-right">
                                                    <div className="text-5xl font-black text-neutral-900 dark:text-white">
                                                        ${plan.price}
                                                    </div>
                                                    <div className="text-neutral-600 dark:text-neutral-400 font-semibold">/month</div>
                                                </div>
                                            )}
                                        </div>

                                        {isLoading ? (
                                            <div className="space-y-3">
                                                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 animate-pulse"></div>
                                                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2 animate-pulse"></div>
                                            </div>
                                        ) : isPremium ? (
                                            <>
                                                {subscription?.currentPeriodEnd && (
                                                    <div className="mb-6 p-4 bg-white/50 dark:bg-white/5 rounded-2xl border border-neutral-200 dark:border-white/10">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-neutral-600 dark:text-neutral-400 font-semibold">Next Billing Date</span>
                                                            <span className="font-black text-neutral-900 dark:text-white">
                                                                {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="mb-8">
                                                    <h3 className="font-black text-xl mb-6 text-neutral-900 dark:text-white">Your Benefits</h3>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        {plan.features?.map((feature, i) => (
                                                            <div
                                                                key={i}
                                                                className="flex items-start gap-3 p-4 bg-white/50 dark:bg-white/5 rounded-xl border border-neutral-200 dark:border-white/10 hover:border-emerald-500/50 transition"
                                                            >
                                                                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                                                                    <FaCheck className="text-white text-xs" />
                                                                </div>
                                                                <span className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">{feature}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => portalMutation.mutate()}
                                                    disabled={portalMutation.isPending}
                                                    className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-black text-lg transition shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 disabled:opacity-50 group"
                                                >
                                                    <FaCreditCard className="text-xl" />
                                                    {portalMutation.isPending ? 'Loading...' : 'Manage Billing & Subscription'}
                                                    <FaArrowRight className="ml-auto group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </>
                                        ) : (
                                            <div className="text-center py-12">
                                                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                                                    <FaCrown className="text-4xl text-emerald-500" />
                                                </div>
                                                <h3 className="text-2xl font-black mb-3 text-neutral-900 dark:text-white">Unlock Premium Recipes</h3>
                                                <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
                                                    Upgrade to access exclusive recipes, meal plans, and ad-free cooking!
                                                </p>
                                                <Link
                                                    to="/pricing"
                                                    className="inline-flex items-center gap-3 bg-linear-to-r from-emerald-500 to-green-600 text-white px-10 py-5 rounded-full font-black text-lg hover:from-emerald-600 hover:to-green-700 transition-all shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 group"
                                                >
                                                    View Premium Plans
                                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        /* SETTINGS TAB */
                        <motion.div
                            key="settings"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="max-w-4xl mx-auto space-y-8"
                        >
                            {/* Profile Settings */}
                            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-lg">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                                            <FaCamera className="text-emerald-500 text-xl" />
                                        </div>
                                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white">Profile Settings</h2>
                                    </div>
                                    {!isEditingProfile ? (
                                        <button
                                            onClick={() => setIsEditingProfile(true)}
                                            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setIsEditingProfile(false);
                                                setUsername(user?.username);
                                                setAvatarPreview(user?.avatar?.url || '');
                                            }}
                                            className="flex items-center gap-2 px-6 py-3 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-white rounded-full font-bold transition"
                                        >
                                            <FaTimes /> Cancel
                                        </button>
                                    )}
                                </div>

                                {!isEditingProfile ? (
                                    /* VIEW MODE */
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-6">
                                            <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center text-3xl font-black border-4 border-emerald-500/20">
                                                {avatarPreview ? (
                                                    <img src={avatarPreview} alt={user?.username} className="w-full h-full rounded-full object-cover" />
                                                ) : (
                                                    user?.username?.charAt(0).toUpperCase()
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Profile Photo</p>
                                                <p className="font-bold text-neutral-900 dark:text-white">{avatarPreview ? 'Uploaded' : 'No photo'}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Username</p>
                                            <p className="font-bold text-lg text-neutral-900 dark:text-white">{user?.username}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Email</p>
                                            <p className="font-bold text-lg text-neutral-900 dark:text-white">{user?.email}</p>
                                            <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">Email cannot be changed</p>
                                        </div>
                                    </div>
                                ) : (
                                    /* EDIT MODE */
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold mb-3 text-neutral-700 dark:text-neutral-300">Profile Photo</label>
                                            <div className="flex items-center gap-6">
                                                <div className="w-24 h-24 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center overflow-hidden">
                                                    {avatarPreview ? (
                                                        <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <FaCamera className="text-4xl text-neutral-400" />
                                                    )}
                                                </div>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleAvatarChange}
                                                    className="flex-1 px-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold mb-3 text-neutral-700 dark:text-neutral-300">Username</label>
                                            <input
                                                type="text"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="w-full px-6 py-4 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold mb-3 text-neutral-700 dark:text-neutral-300">Email (Read-only)</label>
                                            <input
                                                type="email"
                                                value={user?.email}
                                                disabled
                                                className="w-full px-6 py-4 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-500 cursor-not-allowed"
                                            />
                                        </div>

                                        <button
                                            onClick={handleProfileSave}
                                            disabled={updateProfileMutation.isPending}
                                            className="w-full px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-bold transition shadow-lg shadow-emerald-500/30 disabled:opacity-50"
                                        >
                                            {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Password Settings */}
                            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-lg">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                                            <FaLock className="text-red-500 text-xl" />
                                        </div>
                                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white">Change Password</h2>
                                    </div>
                                    {!isChangingPassword && (
                                        <button
                                            onClick={() => setIsChangingPassword(true)}
                                            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold transition"
                                        >
                                            <FaEdit /> Change
                                        </button>
                                    )}
                                </div>

                                {!isChangingPassword ? (
                                    <p className="text-neutral-600 dark:text-neutral-400">Click "Change" to update your password</p>
                                ) : (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold mb-3 text-neutral-700 dark:text-neutral-300">Current Password</label>
                                            <input
                                                type="password"
                                                value={passwordForm.currentPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                                className="w-full px-6 py-4 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
                                                placeholder="••••••••"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold mb-3 text-neutral-700 dark:text-neutral-300">New Password</label>
                                            <input
                                                type="password"
                                                value={passwordForm.newPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                                className="w-full px-6 py-4 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
                                                placeholder="••••••••"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold mb-3 text-neutral-700 dark:text-neutral-300">Confirm New Password</label>
                                            <input
                                                type="password"
                                                value={passwordForm.confirmPassword}
                                                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                                className="w-full px-6 py-4 bg-neutral-50 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 rounded-xl text-neutral-900 dark:text-white focus:outline-none focus:border-emerald-500 transition"
                                                placeholder="••••••••"
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <button
                                                onClick={handlePasswordChange}
                                                disabled={updatePasswordMutation.isPending}
                                                className="flex-1 px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold transition shadow-lg shadow-red-500/30 disabled:opacity-50"
                                            >
                                                {updatePasswordMutation.isPending ? 'Changing...' : 'Update Password'}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsChangingPassword(false);
                                                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                                }}
                                                className="px-8 py-4 bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 text-neutral-900 dark:text-white rounded-full font-bold transition"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Preferences */}
                            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-200 dark:border-neutral-700 shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <FaBell className="text-blue-500 text-xl" />
                                    </div>
                                    <h2 className="text-2xl font-black text-neutral-900 dark:text-white">Preferences</h2>
                                </div>

                                <div className="space-y-6">
                                    {/* Dark Mode Toggle */}
                                    <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-xl border border-neutral-200 dark:border-neutral-600">
                                        <div>
                                            <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Dark Mode</h3>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">Switch between light and dark theme</p>
                                        </div>
                                        <button
                                            onClick={toggleDarkMode}
                                            className={`relative w-14 h-8 rounded-full transition-colors ${isDarkMode ? 'bg-emerald-500' : 'bg-neutral-300'
                                                }`}
                                        >
                                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${isDarkMode ? 'translate-x-7' : 'translate-x-1'
                                                }`}></div>
                                        </button>
                                    </div>

                                    {/* Email Notifications */}
                                    <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-xl border border-neutral-200 dark:border-neutral-600">
                                        <div>
                                            <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Email Notifications</h3>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">Receive updates about new recipes</p>
                                        </div>
                                        <button
                                            onClick={() => setPreferences({ ...preferences, emailNotifications: !preferences.emailNotifications })}
                                            className={`relative w-14 h-8 rounded-full transition-colors ${preferences.emailNotifications ? 'bg-emerald-500' : 'bg-neutral-300'
                                                }`}
                                        >
                                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${preferences.emailNotifications ? 'translate-x-7' : 'translate-x-1'
                                                }`}></div>
                                        </button>
                                    </div>

                                    {/* Newsletter */}
                                    <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-xl border border-neutral-200 dark:border-neutral-600">
                                        <div>
                                            <h3 className="font-bold text-neutral-900 dark:text-white mb-1">Newsletter</h3>
                                            <p className="text-sm text-neutral-600 dark:text-neutral-400">Get weekly cooking tips and recipes</p>
                                        </div>
                                        <button
                                            onClick={() => setPreferences({ ...preferences, newsletter: !preferences.newsletter })}
                                            className={`relative w-14 h-8 rounded-full transition-colors ${preferences.newsletter ? 'bg-emerald-500' : 'bg-neutral-300'
                                                }`}
                                        >
                                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${preferences.newsletter ? 'translate-x-7' : 'translate-x-1'
                                                }`}></div>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="bg-red-50 dark:bg-red-900/20 rounded-3xl p-8 border-2 border-red-200 dark:border-red-500/30">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                                        <FaTrash className="text-red-500 text-xl" />
                                    </div>
                                    <h2 className="text-2xl font-black text-red-600 dark:text-red-400">Danger Zone</h2>
                                </div>
                                <p className="text-neutral-700 dark:text-neutral-300 mb-6">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <button className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white rounded-full font-bold transition shadow-lg shadow-red-500/30">
                                    Delete Account
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Account;
