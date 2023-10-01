"use client";

import dayjs, { Dayjs } from "dayjs";
import { collection, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { createContext, useContext, useEffect } from "react";
import { createStore, StoreApi, useStore } from "zustand";

import { type ScheduleState, type UserState } from "@/lib/entity";
import { db, initializeFirebaseApp } from "@/lib/firebase";


type UsersStore<T> = T & {
    users: UserState[];
    setUsers: (users: UserState[]) => void;

    currentUser: UserState | undefined;
    setCurrentUser: (user: UserState | undefined) => void;
}

type SchedulesStore<T> = T & {
    schedules: ScheduleState[];
    setSchedules: (schedules: ScheduleState[]) => void;
}

type CalendarDateStore<T> = T & {
    selectedDate: Dayjs | undefined;
    setSelectedDate: (selectedDate: Dayjs) => void;
}

type DataBaseStore = UsersStore<SchedulesStore<CalendarDateStore<{}>>>

const createDataBaseStore = (): StoreApi<DataBaseStore> => {
    return createStore<DataBaseStore>((set) => ({
        users: [],
        setUsers: (users: UserState[]) => {
            // console.log("[updateUsers] called.");
            set(() => ({ users: users }));
        },

        currentUser: undefined,
        setCurrentUser: (user: UserState | undefined) => {
            // console.log("[setCurrentUser] called.");
            set(() => ({ currentUser: user }));
        },

        schedules: [],
        setSchedules: (schedules: ScheduleState[]) => {
            // console.log("[updateSchedules] called.");
            set(() => ({ schedules: schedules }));
        },

        selectedDate: dayjs(),
        setSelectedDate(selectedDate: Dayjs) {
            // console.log("[setSelectedDate] called.");
            set(() => ({ selectedDate: selectedDate }));
        },
    }));
};

const DataBaseContext = createContext<ReturnType<typeof createDataBaseStore> | null>(null);

type Props = {
    children: React.ReactNode
}
export const DataBaseProvider = ({ children }: Props) => {
    const store = createDataBaseStore();

    useEffect(() => {
        const state = store.getState();
        initializeFirebaseApp();

        const unSubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
            state.setUsers(
                snapshot.docs.map((doc) => (
                    {
                        name: doc.data().name,
                        id: doc.id
                    } as UserState
                )));
            // console.log(snapshot.docs);
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);  // 登録時間が0時0分0秒のときにも対応するため
        const q = query(collection(db, "schedules"), where("date", ">=", Timestamp.fromDate(today)));
        const unSubscribeSchedules = onSnapshot(q, (snapshot) => {
            state.setSchedules(
                snapshot.docs.map((doc) => (
                    {
                        // ...structuredClone(doc.data()),
                        userId: doc.data().userId,
                        title: doc.data().title,
                        date: doc.data().date,
                        category: doc.data().category,
                        createdAt: doc.data().createdAt,
                        updatedAt: doc.data().updatedAt,
                        id: doc.id
                    } as ScheduleState
                ))
            );
        });

        return () => {
            unSubscribeUsers();
            unSubscribeSchedules();
        };
    }, [store]);

    return (
        <DataBaseContext.Provider value={store}>
            {children}
        </DataBaseContext.Provider>
    );
};

export const useDataBaseStore = (): DataBaseStore => {
    const context = useContext(DataBaseContext);
    if (context === null) {
        throw new Error("No provider found");
    }
    return useStore(context);
};
