"use client";

import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect } from "react";
import { createStore, StoreApi, useStore } from "zustand";

import { db, initializeFirebaseApp } from "@/app/firebase";
import { type ScheduleState, type UserState } from "@/lib/entity";


type UsersStore<T> = T & {
    users: UserState[];
    currentUser: UserState | undefined;
    updateUsers: (users: UserState[]) => void;
    setCurrentUser: (user: UserState | undefined) => void;
}

type SchedulesStore<T> = T & {
    schedules: ScheduleState[];
    updateSchedules: (schedules: ScheduleState[]) => void;
}

type DataBaseStore = UsersStore<SchedulesStore<{}>>

const createDataBaseStore = (): StoreApi<DataBaseStore> => {
    return createStore<DataBaseStore>((set) => ({
        users: [],
        currentUser: undefined,
        updateUsers: (users: UserState[]) => set(() => ({ users: users })),
        setCurrentUser: (user: UserState | undefined) => set(() => ({ currentUser: user })),

        schedules: [],
        updateSchedules: (schedules: ScheduleState[]) => set(() => ({ schedules: schedules })),
    }));
};

const DataBaseContext = createContext<ReturnType<typeof createDataBaseStore> | null>(null);

type Props = {
    children: React.ReactNode
}
export const DataBaseProvider = ({ children }: Props) => {
    const store = createDataBaseStore();
    // const { user } = useAuthContext();

    useEffect(() => {
        const state = store.getState();
        initializeFirebaseApp();

        onSnapshot(collection(db, "users"), (snapshot) => {
            state.updateUsers(
                snapshot.docs.map((doc) => (
                    { name: doc.data().name, id: doc.id } as UserState
                )));
            console.log(snapshot.docs);
        });
        onSnapshot(collection(db, "schedules"), (snapshot) => {
            state.updateSchedules(
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
    }, [store]);

    return (
        <DataBaseContext.Provider value={store}>{children}</DataBaseContext.Provider>
    );
};

export const useDataBaseStore = (): DataBaseStore => {
    const context = useContext(DataBaseContext);
    if (context === null) {
        throw new Error("No provider found");
    }
    return useStore(context);
};
