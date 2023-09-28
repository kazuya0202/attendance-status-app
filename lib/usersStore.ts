import { create } from "zustand";

type UserState = {
    id: string;
    name: string;
}

type UsersStore = {
    users: UserState[];
    currentUser: UserState | undefined;
    updateUsers: (users: UserState[]) => void;
    setCurrentUser: (user: UserState | undefined) => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
    users: [],
    currentUser: undefined,
    updateUsers: (users: UserState[]) => set(() => ({ users: users })),
    setCurrentUser: (user: UserState | undefined) => set(() => ({ currentUser: user })),
}));
