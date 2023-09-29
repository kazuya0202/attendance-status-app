import { Timestamp } from "firebase/firestore";

type WithTimestamp<T> = T & {
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

type WithSnapshotId<T> = T & {
    id: string;
}

// plan, event
export type ScheduleState = WithSnapshotId<WithTimestamp<{
    userId: string;
    title: string;
    date: Timestamp;
    type_: "plan" | "event";
}>>


export type UserState = {
    id: string;
    name: string;
}
