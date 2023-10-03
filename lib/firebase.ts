"use client";

import dayjs from "dayjs";
import { getApp, getApps, initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getFirestore, Timestamp, updateDoc } from "firebase/firestore";

import { formatDate } from "@/lib/dayjsUtility/util";
import { EventDocumentConverter, EventDocumentWithId, PlanDocumentConverter, PlanDocumentWithId, ScheduleCategories } from "@/lib/entity";

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

export const collectionRef = {
  // ? converter設定してもTimestampで返ってくる
  // [ScheduleCategories.PLAN]: collection(db, "plans").withConverter(PlanDocumentConverter),
  // [ScheduleCategories.EVENT]: collection(db, "events").withConverter(EventDocumentConverter),
  [ScheduleCategories.PLAN]: collection(db, "plans"),
  [ScheduleCategories.EVENT]: collection(db, "events"),
};

export const addSchedule = async (
  newSchedule: PlanDocumentWithId | EventDocumentWithId,
  cat: ScheduleCategories
) => {
  // const runtimeTimestamp = Timestamp.now();
  const docRef = await addDoc(
    collectionRef[cat],
    newSchedule
  );

  console.log(`[addSchedule (${cat})]`, docRef.id, formatDate(dayjs(newSchedule.date.toDate())));
};

export const updateSchedule = async (
  newSchedule: PlanDocumentWithId | EventDocumentWithId,
  cat: ScheduleCategories
) => {
  // const runtimeTimestamp = Timestamp.now();
  const docRef = await updateDoc(
    doc(collectionRef[cat], newSchedule.id),
    newSchedule
  );

  console.log(`[updateSchedule (${cat})]`, newSchedule.id, formatDate(dayjs(newSchedule.date.toDate())));
};

export const deleteSchedule = async (docId: string, cat: ScheduleCategories) => {
  await deleteDoc(doc(collectionRef[cat], docId));

  console.log(`[deleteSchedule (${cat})]`, docId);
};
