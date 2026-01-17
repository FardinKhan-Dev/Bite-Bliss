import { useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { queryClient } from './lib/queryClient';
import { useAuthStore } from './store/useAuthStore';

import Layout from './components/ui/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import GoogleCallback from './pages/auth/GoogleCallback';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Pricing from './pages/Pricing';
import SubscriptionSuccess from './pages/subscription/Success';
import SubscriptionCancel from './pages/subscription/Cancel';
import Account from './pages/Account';
import Recipes from './pages/Recipes';
import NotFound from './pages/NotFound';

function App() {
    const { fetchMe } = useAuthStore();

    // Restore user session on app load
    useEffect(() => {
        fetchMe();
    }, [fetchMe]);

    return (
        <HelmetProvider>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        {/* Layout wrapper for all pages with Navbar & Footer */}
                        <Route element={<Layout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/recipes" element={<Recipes />} />
                            <Route path="/recipe/:slug" element={<RecipeDetail />} />
                            <Route path="/pricing" element={<Pricing />} />
                            <Route path="/subscription/success" element={<SubscriptionSuccess />} />
                            <Route path="/subscription/cancel" element={<SubscriptionCancel />} />
                            <Route path="/account" element={<Account />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/connect/google/redirect" element={<GoogleCallback />} />

                            {/* 404 Catch-all route */}
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                    <Toaster position="top-center" />
                </BrowserRouter>
            </QueryClientProvider>
        </HelmetProvider>
    );
}

export default App;
