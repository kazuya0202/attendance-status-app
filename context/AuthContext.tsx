"use client";

import type { User } from "@firebase/auth";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import { db, initializeFirebaseApp, UserState } from "@/app/firebase";
import { useUsersStore } from "@/lib/usersStore";

export type AuthState = {
    user: User | null | undefined
}
const initialState: AuthState = {
    user: undefined,
};
const AuthContext = createContext<AuthState>(initialState);

type Props = { children: ReactNode }

export const AuthProvider = ({ children }: Props) => {
    const router = useRouter();
    const [user, setUser] = useState<AuthState>(initialState);
    const { users, updateUsers } = useUsersStore();

    useEffect(() => {
        initializeFirebaseApp();
        // store
        const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
            updateUsers(
                snapshot.docs.map((doc) => (
                    { name: doc.data().name, id: doc.id } as UserState
                )));
            console.log(snapshot.docs);
        });
        // return unsub;

        try {
            const auth = getAuth();
            return onAuthStateChanged(auth, (user) => {
                setUser({
                    user,
                });
            });
        } catch (error) {
            setUser(initialState);
            throw error;
        }
    }, [updateUsers]);

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
