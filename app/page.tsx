"use client";

import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { redirect } from "next/navigation";

import AddScheduleComponent from "@/components/AddScheduleComponent";
import DataCalendarComponent from "@/components/MonthCalendar";
import PageLoading from "@/components/PageLoading";
import ScheduleList from "@/components/ScheduleList";
import { useAuthContext } from "@/context/AuthContext";
import { useDataBaseStore } from "@/store/DataBaseProvider";

export default function Home() {
    const { users, currentUser } = useDataBaseStore();
    const { user } = useAuthContext();

    if (user === undefined) {
        return <PageLoading />;
    } else if (user === null) {
        redirect("/login");
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={"auto"} className="hidden md:block">
                    <DataCalendarComponent />
                </Grid>
                <Grid item style={{ alignSelf: "stretch" }} className="hidden md:block">
                    <Divider orientation="vertical" />
                </Grid>
                <Grid item xs className="">
                    <AddScheduleComponent />
                    <ScheduleList />
                </Grid>
            </Grid >
        </>
    );
}
