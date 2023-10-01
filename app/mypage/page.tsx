"use client";

import { Stack } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { green } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { redirect } from "next/navigation";

import PageLoading from "@/components/PageLoading";
import { useAuthContext } from "@/context/AuthContext";
import { useDataBaseStore } from "@/store/DataBaseProvider";


export default function MyPage() {
    const { user } = useAuthContext();
    const { currentUser } = useDataBaseStore();

    if (user === undefined) {
        return <PageLoading />;
    } else if (user === null) {
        redirect("/login");
    }

    return (
        <>
            <Typography gutterBottom variant="h4">マイページ</Typography>

            <Alert severity="info">
                <AlertTitle>今後実装予定のメモ</AlertTitle>
                <Typography>
                    ・表示名の変更 <br />
                    ・スケジュールの確認・編集（自分のみ） <br />
                    ・etc... <br />
                </Typography>
            </Alert>

            <Card sx={{ minWidth: 275 }} className="bg-slate-100 my-3">
                <CardContent>
                    <Stack direction="row" className="">
                        <Avatar sx={{ bgcolor: green[500] }} >
                            {currentUser?.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography sx={{ fontSize: 18 }} className="ml-3">
                            {currentUser?.name}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </>
    );
}
