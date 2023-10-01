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
    category: "plan" | "event";
}>>


export type UserState = WithSnapshotId<{
    name: string;
}>
