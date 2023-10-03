"use client";

import { collection, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { createContext, useContext, useEffect } from "react";
import { createStore, StoreApi, useStore } from "zustand";

import { EventDocumentWithId, PlanDocumentWithId, ScheduleCategories, type UserState } from "@/lib/entity";
import { collectionRef, db, initializeFirebaseApp } from "@/lib/firebase";


type UsersStore<T> = T & {
    users: UserState[];
    setUsers: (users: UserState[]) => void;

    currentUser: UserState | undefined;
    setCurrentUser: (user: UserState | undefined) => void;
}

type SchedulesStore<T> = T & {
    plans: PlanDocumentWithId[];
    setPlans: (schedules: PlanDocumentWithId[]) => void;

    events: EventDocumentWithId[];
    setEvents: (events: EventDocumentWithId[]) => void;
}

type DataBaseStore = UsersStore<SchedulesStore<{}>>

const createDataBaseStore = (): StoreApi<DataBaseStore> => {
    return createStore<DataBaseStore>((set) => ({
        users: [],
        setUsers: (users: UserState[]) => {
            set(() => ({ users: users }));
        },

        currentUser: undefined,
        setCurrentUser: (user: UserState | undefined) => {
            set(() => ({ currentUser: user }));
        },

        plans: [],
        setPlans: (plans: PlanDocumentWithId[]) => {
            set(() => ({ plans: plans }));
        },

        events: [],
        setEvents: (events: EventDocumentWithId[]) => {
            set(() => ({ events: events }));
        }
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
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const queryPlans = query(
            collectionRef[ScheduleCategories.PLAN],
            where("date", ">=", Timestamp.fromDate(today))
        );
        const unSubscribePlans = onSnapshot(queryPlans, (snapshot) => {
            state.setPlans(
                snapshot.docs.map((doc) => (
                    {
                        userId: doc.data().userId,
                        title: doc.data().title,
                        date: doc.data().date,
                        createdAt: doc.data().createdAt,
                        updatedAt: doc.data().updatedAt,
                        id: doc.id
                    } as PlanDocumentWithId
                ))
            );
        });

        const queryEvents = query(
            collectionRef[ScheduleCategories.EVENT],
            where("date", ">=", Timestamp.fromDate(today))
        );
        const unSubscribeEvents = onSnapshot(queryEvents, (snapshot) => {
            state.setEvents(
                snapshot.docs.map((doc) => (
                    {
                        userId: doc.data().userId,
                        title: doc.data().title,
                        date: doc.data().date,
                        createdAt: doc.data().createdAt,
                        updatedAt: doc.data().updatedAt,
                        id: doc.id
                    } as EventDocumentWithId
                ))
            );
        });

        return () => {
            unSubscribeUsers();
            unSubscribePlans();
            unSubscribeEvents();
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
