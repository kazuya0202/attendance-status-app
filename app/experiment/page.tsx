"use client";

import { redirect } from "next/navigation";

import PageLoading from "@/components/PageLoading";
import { useAuthContext } from "@/context/AuthContext";

import DayCheckbox from "./DayCheckbox";


export default function ExperimentPage() {
    const { user } = useAuthContext();

    if (user === undefined) {
        return <PageLoading />;
    } else if (user === null) {
        redirect("/login");
    }

    return (
        <>
            <DayCheckbox />
            <PageLoading />
        </>
    );
}
