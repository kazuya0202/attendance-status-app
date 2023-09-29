"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { blue } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { collection, onSnapshot } from "firebase/firestore";
import { redirect } from "next/navigation";

import { useAuthContext } from "@/context/AuthContext";
import { useDataBaseStore } from "@/store/DataBaseProvider";

export default function MyPage() {
    const { user } = useAuthContext();
    const { users, currentUser } = useDataBaseStore();

    if (user === undefined) {
        return <Box>loding...</Box>;
    } else if (user === null) {
        redirect("/login");
    }

    const getUserCard = () => {
        return (
            <>
                <Card sx={{ minWidth: 275 }} className="bg-slate-100 ">
                    <CardContent>
                        <Avatar sx={{ bgcolor: blue[500] }} >
                            {currentUser?.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography sx={{ fontSize: 18 }} gutterBottom>
                            {currentUser?.name}
                        </Typography>
                    </CardContent>
                </Card>
            </>
        );
    };

    return (
        <>
            <h1>My Page</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            {getUserCard()}
        </>
    );
}
