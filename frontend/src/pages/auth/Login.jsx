import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
// import { useLoginMutation } from '../redux/services/api'; // Removed Redux
// import { useDispatch, useSelector } from 'react-redux'; // Removed Redux
// import { setCredentials } from '../redux/features/authSlice'; // Removed Redux
import { useAuthStore } from '../../store/useAuthStore'; // Added Zustand
import toast from 'react-hot-toast';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch(); // Removed Redux
    // const [login, { isLoading }] = useLoginMutation(); // Removed Redux
    // const { user } = useSelector((state) => state.auth); // Removed Redux

    const { login, isLoading, user } = useAuthStore(); // Added Zustand

    useEffect(() => {
        if (user) navigate('/');
    }, [user, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            // Adapted auth call
            await login(data.email, data.password);
            toast.success('Welcome back!');
            navigate('/');
        } catch (err) {
            toast.error(err?.response?.data?.error?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-xl">
                <h2 className="text-3xl font-display font-bold text-center mb-2">Welcome Back</h2>
                <p className="text-gray-400 text-center mb-8">Sign in to your account</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                        <input
                            {...register('email')}
                            type="email"
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input
                            {...register('password')}
                            type="password"
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors text-white"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-transparent text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <a
                        href={`${import.meta.env.VITE_API_URL || 'http://localhost:1337/api'}/connect/google`}
                        className="w-full flex items-center justify-center py-3 px-4 border border-gray-600 rounded-xl shadow-sm text-sm font-medium text-gray-300 bg-black/30 hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
                    >
                        <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                            />
                        </svg>
                        Google
                    </a>
                </form>

                <p className="mt-8 text-center text-gray-400 text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary hover:text-emerald-400 font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
