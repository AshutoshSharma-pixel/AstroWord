'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/utils/firebase/config';
import { useRouter, usePathname } from 'next/navigation';

type AuthContextType = {
    user: User | null;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

// Pages that must be publicly accessible (no login required)
const PUBLIC_ROUTES = [
    '/darakaraka',
    '/atmakaraka',
    '/amatyakaraka',
    '/gana',
    '/marriage-type',
    '/marriage-year',
    '/spouse-initial',
    '/login',
    '/blog',
];

const isPublicRoute = (path: string) =>
    PUBLIC_ROUTES.some((route) => path === route || path.startsWith(route + '/'));

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (!currentUser && !isPublicRoute(pathname)) {
                // Protect private routes — redirect unauthenticated users to login
                router.push('/login');
            } else if (currentUser && pathname === '/login') {
                // Already logged in — send away from login page
                router.push('/');
            }
        });

        return () => unsubscribe();
    }, [pathname, router]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
