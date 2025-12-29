import { QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { queryClient } from './lib/queryClient';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import GoogleCallback from './pages/auth/GoogleCallback';
import Home from './pages/Home';

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/connect/google/redirect" element={<GoogleCallback />} />
            </Routes>
            <Toaster position="top-center" />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
