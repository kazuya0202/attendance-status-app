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
import { ScheduleState } from "@/lib/entity";
import { useSchedulesStore } from "@/lib/schedulesStore";
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
    const { updateSchedules } = useSchedulesStore();

    useEffect(() => {
        initializeFirebaseApp();
        // store
        onSnapshot(collection(db, "users"), (snapshot) => {
            updateUsers(
                snapshot.docs.map((doc) => (
                    { name: doc.data().name, id: doc.id } as UserState
                )));
            console.log(snapshot.docs);
        });
        onSnapshot(collection(db, "schedules"), (snapshot) => {
            updateSchedules(
                snapshot.docs.map((doc) => (
                    {
                        userId: doc.data().userId,
                        title: doc.data().title,
                        date: doc.data().date,
                        type_: doc.data().type,
                        createdAt: doc.data().createdAt,
                        updatedAt: doc.data().updatedAt,
                        id: doc.id
                    } as ScheduleState
                ))
            );
        });

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
    }, [updateUsers, updateSchedules]);

    return (
        <AuthContext.Provider value={user}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
