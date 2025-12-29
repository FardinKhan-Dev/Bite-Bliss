import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

export default function GoogleCallback() {
    const location = useLocation();
    const navigate = useNavigate();
    const { fetchMe } = useAuthStore();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const jwt = params.get('jwt');

        if (jwt) {
            // Store token
            Cookies.set('jwt', jwt, { expires: 7, sameSite: 'Strict', secure: true });

            // Update store state
            fetchMe().then(() => {
                toast.success('Successfully logged in with Google!');
                navigate('/');
            }).catch((err) => {
                console.error('Failed to fetch user', err);
                toast.error('Failed to verify Google login');
                navigate('/login');
            });
        } else {
            // If no JWT, check if there was an error
            const error = params.get('error');
            if (error) {
                toast.error(`Google Login Failed: ${error}`);
            } else {
                toast.error('No authentication token received');
            }
            navigate('/login');
        }
    }, [location, navigate, fetchMe]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">Authenticating...</h2>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            </div>
        </div>
    );
}
