import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { addDoc, collection, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { formatDate } from "@/lib/dayjsUtility/util";
import { ScheduleState } from "@/lib/entity";
import { addSchedule, db, deleteSchedule } from "@/lib/firebase";
import { useDataBaseStore } from "@/store/DataBaseProvider";

type Props = {
    open: boolean;
    handleClose: () => void;
    // registerHandler(): void;
    defaultDate?: Dayjs;
    // plans: ScheduleState[];
    documentIdOfCurrentUser?: string;
};

type CancelInputs = {
    date: Dayjs;
};

type RegisterInputs = {
    date: Dayjs;
};

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ModifyScheduleDialog({
    open,
    handleClose,
    defaultDate = dayjs().tz(),
    // plans,
    documentIdOfCurrentUser,
}: Props) {
    const { currentUser } = useDataBaseStore();
    const router = useRouter();

    // form
    const { handleSubmit: handleSubmitCancel } = useForm<CancelInputs>({});
    const onSubmitCancel: SubmitHandler<CancelInputs> = async (data) => {
        if (documentIdOfCurrentUser) {
            deleteSchedule(documentIdOfCurrentUser);
        } else {
            console.log("document was not found");
        }
        handleClose();
        // todo: snackbar
    };
    const { handleSubmit: handleSubmitRegister } = useForm<RegisterInputs>({});
    const onSubmitRegister: SubmitHandler<RegisterInputs> = async (data) => {
        const dateWithoutTime = defaultDate.toDate();
        dateWithoutTime.setHours(0, 0, 0, 0);
        const newSchedule = {
            title: "登校",
            date: Timestamp.fromDate(dateWithoutTime),
            category: "plan",
            userId: currentUser?.id,
        } as ScheduleState;
        addSchedule(newSchedule);
        handleClose();
        // todo: snackbar
    };

    return (
        <>
            {open && (
                <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        fullWidth={true}
                        maxWidth="sm"
                    >
                        <DialogContent className="my-4 mx-4">
                            {documentIdOfCurrentUser && (
                                <form onSubmit={handleSubmitCancel(onSubmitCancel)}>
                                    <Grid container className="mt-8 mx-auto grid-flow-col md:grid-flow-row">
                                        <Grid item xs="auto" md className="mx-auto w-full md:max-w-sm md:mx-0">
                                            <Typography variant="body1" className="my-auto">
                                                {`${formatDate(defaultDate)}の予定を取り消しますか？`}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs="auto" className="ml-auto mt-4 md:mt-0 md:ml-4">
                                            <Button
                                                type="submit"
                                                variant="outlined"
                                                className="bg-red-white border-red-500 text-red-500 rounded-full px-8 w-full p-4 md:ml-4 md:h-full"
                                            >
                                                取り消す
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            ) || (
                                    <form onSubmit={handleSubmitRegister(onSubmitRegister)}>
                                        <Grid container className="mt-8 mx-auto grid-flow-col md:grid-flow-row" >
                                            <Grid item xs="auto" md className="mx-auto w-full md:max-w-sm md:mx-0">
                                                <Typography variant="body1" className="my-auto">
                                                    {`${formatDate(defaultDate)}に予定を登録しますか？`}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs="auto" className="ml-auto mt-4 md:mt-0 md:ml-4">
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    className="rounded-full px-8 w-full p-4 md:ml-4 md:h-full"
                                                >
                                                    登校する
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                )}
                        </DialogContent>
                    </Dialog>
                </Box >
            )
            }
        </>
    );
}
