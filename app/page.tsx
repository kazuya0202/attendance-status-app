"use client";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { redirect } from "next/navigation";

import { db } from "@/app/firebase";
import AddScheduleDialogComponent from "@/components/AddScheduleDialogComponent";
import DataCalendarComponent from "@/components/MonthCalendar";
import ScheduleList from "@/components/ScheduleList";
import { useAuthContext } from "@/context/AuthContext";
import { useUsersStore } from "@/lib/usersStore";

export default function Home() {
    const { users, currentUser } = useUsersStore();
    const { user } = useAuthContext();

    if (user === undefined) {
        return <Box>loding...</Box>;
    } else if (user === null) {
        redirect("/login");
    }


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#ffffe1",
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.secondary,
    }));


    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={"auto"}>
                    {/* <Item>xs=auto</Item> */}
                    <DataCalendarComponent />
                </Grid>
                <Grid item style={{ alignSelf: "stretch" }}>
                    <Divider orientation="vertical" />
                </Grid>
                <Grid item xs>
                    {/* <Item>xs</Item> */}
                    {/* <ul>
                        {users.map((user) => (
                            <li key={user.id}>{user.name}</li>
                        ))}
                    </ul> */}
                    <AddScheduleDialogComponent />
                    <ScheduleList />
                </Grid>
            </Grid >
        </>
    );
}
