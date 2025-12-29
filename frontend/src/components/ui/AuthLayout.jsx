import { Link } from 'react-router-dom';

export default function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-100 py-12 px-4 sm:px-6 lg:px-8 bg-[url('https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=2532&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/40 backdrop-blur-sm fixed inset-0 overflow-y-auto">
            <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl ring-1 ring-gray-900/5 transition-all duration-300 hover:shadow-primary-500/20">
                <div className="text-center">
                    <Link to="/" className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-600 inline-block mb-2 hover:scale-105 transition-transform duration-200">
                        Bite Bliss
                    </Link>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="mt-2 text-sm text-gray-600">
                            {subtitle}
                        </p>
                    )}
                </div>

                {children}
            </div>
        </div>
    );
}
