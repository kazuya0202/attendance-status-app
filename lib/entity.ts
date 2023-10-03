import { FirestoreDataConverter, Timestamp } from "firebase/firestore";

type WithTimestamp<T> = T & {
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

type WithSnapshotId<T> = T & {
    id: string;
}

export enum ScheduleCategories {
    PLAN = "plan",  // 登校予定
    EVENT = "event",  // その日の予定
}

type PlanDocument = WithTimestamp<{
    userId: string;
    title: string;
    // date: Date;
    date: Timestamp;
}>
export type PlanDocumentWithId = WithSnapshotId<PlanDocument>

type EventDocument = WithTimestamp<{
    userId: string;
    title: string;
    // date: Date;
    date: Timestamp;
}>
export type EventDocumentWithId = WithSnapshotId<EventDocument>

export type UserState = WithSnapshotId<{
    name: string;
}>

export const PlanDocumentConverter: FirestoreDataConverter<PlanDocumentWithId> = {
    toFirestore: (doc) => {
        return {
            userId: doc.userId,
            title: doc.title,
            date: doc.date,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            userId: data.userId,
            title: data.title,
            date: data.date,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    }
};

export const EventDocumentConverter: FirestoreDataConverter<EventDocumentWithId> = {
    toFirestore: (doc) => {
        return {
            userId: doc.userId,
            title: doc.title,
            date: doc.date,
            createdAt: doc.createdAt,
            updatedAt: doc.updatedAt,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            userId: data.userId,
            title: data.title,
            date: data.date,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    }
};
