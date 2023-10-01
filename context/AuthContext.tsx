"use client";

import type { User } from "@firebase/auth";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { initializeFirebaseApp } from "@/lib/firebase";
import { useDataBaseStore } from "@/store/DataBaseProvider";

export type AuthState = {
    user: User | null | undefined
}
const initialState: AuthState = {
    user: undefined,
};
const AuthContext = createContext<AuthState>(initialState);

type Props = { children: ReactNode }

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<AuthState>(initialState);
    const { users, setCurrentUser } = useDataBaseStore();

    useEffect(() => {
        initializeFirebaseApp();

        try {
            const auth = getAuth();
            return onAuthStateChanged(auth, (user) => {
                setUser({ user });
                setCurrentUser(users.find((u) => u.id === user?.uid));
            });
        } catch (error) {
            setUser(initialState);
            throw error;
        }
    }, [setCurrentUser, users]);

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
