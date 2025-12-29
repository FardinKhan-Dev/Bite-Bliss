import { create } from 'zustand';
import Cookies from 'js-cookie';
import { api } from '../lib/axios';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: !!Cookies.get('jwt'),
    isLoading: false,
    error: null,

    login: async (identifier, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/auth/local', {
                identifier,
                password,
            });

            const { jwt, user } = response.data;

            // Store token in cookie (expires in 7 days, strict security)
            Cookies.set('jwt', jwt, { expires: 7, sameSite: 'Strict', secure: true });

            set({ user, isAuthenticated: true, isLoading: false });
            return user;
        } catch (error) {
            set({
                error: error.response?.data?.error?.message || 'Login failed',
                isLoading: false,
            });
            throw error;
        }
    },

    register: async (username, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await api.post('/auth/local/register', {
                username,
                email,
                password,
            });

            const { jwt, user } = response.data;
            Cookies.set('jwt', jwt, { expires: 7, sameSite: 'Strict', secure: true });

            set({ user, isAuthenticated: true, isLoading: false });
            return user;
        } catch (error) {
            set({
                error: error.response?.data?.error?.message || 'Registration failed',
                isLoading: false,
            });
            throw error;
        }
    },

    logout: () => {
        Cookies.remove('jwt');
        set({ user: null, isAuthenticated: false });
    },

    // Hydrate user on refresh if token exists
    fetchMe: async () => {
        const token = Cookies.get('jwt');
        if (!token) return;

        try {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const response = await api.get('/users/me');
            set({ user: response.data, isAuthenticated: true });
        } catch (error) {
            Cookies.remove('jwt');
            set({ user: null, isAuthenticated: false });
        }
    }
}));
