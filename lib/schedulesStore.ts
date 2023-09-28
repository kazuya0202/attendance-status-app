import { create } from "zustand";

import { ScheduleState } from "./entity";

type SchedulesStore = {
    schedules: ScheduleState[];
    updateSchedules: (schedules: ScheduleState[]) => void;
}

export const useUsersStore = create<SchedulesStore>((set) => ({
    schedules: [],
    updateSchedules: (schedules: ScheduleState[]) => set(() => ({ schedules: schedules })),
}));
