"use client";

import dayjs from "dayjs";
import { getApp, getApps, initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getFirestore, Timestamp, updateDoc } from "firebase/firestore";

import { formatDate } from "@/lib/dayjsUtility/util";
import { ScheduleState } from "@/lib/entity";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

export const initializeFirebaseApp = () => !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const firebaseApp = initializeFirebaseApp();
export const db = getFirestore(firebaseApp);

const schedulueCollectionRef = collection(db, "schedules");

export const addSchedule = async (newSchedule: ScheduleState) => {
  const runtimeTimestamp = Timestamp.fromDate(dayjs().toDate());
  const docRef = await addDoc(schedulueCollectionRef, {
    title: newSchedule.title,
    date: newSchedule.date,
    category: newSchedule.category,
    createdAt: runtimeTimestamp,
    updatedAt: runtimeTimestamp,
    userId: newSchedule.userId,
  } as ScheduleState);

  console.log("[addSchedule]", docRef.id, formatDate(dayjs(newSchedule.date.toDate())));
};

export const updateSchedule = async (newSchedule: ScheduleState) => {
  const runtimeTimestamp = Timestamp.fromDate(dayjs().toDate());
  const docRef = await updateDoc(doc(schedulueCollectionRef, newSchedule.id), {
    title: newSchedule.title,
    date: newSchedule.date,
    category: newSchedule.category,
    createdAt: newSchedule.createdAt,
    updatedAt: runtimeTimestamp,
    userId: newSchedule.userId,
  } as ScheduleState);

  console.log("[updateSchedule]", newSchedule.id, formatDate(dayjs(newSchedule.date.toDate())));
};

export const deleteSchedule = async (docId: string) => {
  await deleteDoc(doc(schedulueCollectionRef, docId));

  console.log("[deleteSchedule]", docId);
};
