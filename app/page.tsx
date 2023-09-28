"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { redirect } from "next/navigation";

import { db } from "@/app/firebase";
import AddScheduleDialog from "@/components/AddScheduleDialog";
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

    return (
        <div>
            <h1>Home</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            <AddScheduleDialog />
        </div>
    );
}
