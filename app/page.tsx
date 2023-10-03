"use client";

import { Box, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { redirect } from "next/navigation";

import AddScheduleComponent from "@/components/AddScheduleComponent";
import DataCalendarComponent from "@/components/MonthCalendar";
import PageLoading from "@/components/PageLoading";
import ScheduleList from "@/components/ScheduleList";
import { useAuthContext } from "@/context/AuthContext";
import { useDataBaseStore } from "@/store/DataBaseProvider";

export default function Home() {
    const { user } = useAuthContext();

    if (user === undefined) {
        return <PageLoading />;
    } else if (user === null) {
        redirect("/login");
    }

    return (
        <>
            <Box className="mx-5 sm:my-5">
                <Grid container spacing={1} direction={"row"}>
                    <Grid item xs={"auto"} className="hidden md:block">
                        <DataCalendarComponent />
                    </Grid>
                    <Grid item style={{ alignSelf: "stretch" }} className="hidden md:block">
                        <Divider orientation="vertical" />
                    </Grid>
                    <Grid item xs className="sm:mx-3">
                        <AddScheduleComponent />
                        <ScheduleList />
                    </Grid>
                </Grid >
            </Box>
        </>
    );
}
