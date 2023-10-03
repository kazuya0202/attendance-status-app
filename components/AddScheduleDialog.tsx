import Alert from "@mui/material/Alert";
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
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { EventDocumentWithId, PlanDocumentWithId, ScheduleCategories } from "@/lib/entity";
import { addSchedule } from "@/lib/firebase";
import { useDataBaseStore } from "@/store/DataBaseProvider";

import DateProvider from "./DateProvider";

type PlanInputs = {
    date: Dayjs;
}

type EventInputs = {
    title: string;
    date: Dayjs;
}

type Props = {
    open: boolean;
    handleClose: () => void;
}

const CustomToggleButton = styled(ToggleButton)(({ }) => ({
    "&.Mui-selected, &.Mui-selected:hover": {
        color: "white",
        backgroundColor: grey[800],
    },
}));

const styles = {
    mobiledialogprops: {
        ".MuiDatePickerToolbar-title": {
            fontSize: "1.5rem",
        },
    },
};

export default function AddScheduleDialog({ open, handleClose }: Props) {
    const [currentCategory, setCurrentCategory] = useState(ScheduleCategories.PLAN);
    const { currentUser } = useDataBaseStore();

    const { control: planControl, handleSubmit: planHandleSubmit } = useForm<PlanInputs>({
        defaultValues: {
            date: dayjs(),
        },
    });
    const { control: eventControl, handleSubmit: eventHandleSubmit } = useForm<EventInputs>({
        defaultValues: {
            date: dayjs(),
            title: "",
        },
    });

    const onSubmitPlan: SubmitHandler<PlanInputs> = async (data) => {
        const dateWithoutTime = data.date.toDate();
        dateWithoutTime.setHours(0, 0, 0, 0);

        const newSchedule = {
            title: "登校",
            date: Timestamp.fromDate(dateWithoutTime),
            userId: currentUser?.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        } as PlanDocumentWithId;
        addSchedule(newSchedule, currentCategory);
        handleClose();
        // todo: snackbar
    };

    const onSubmitEvent: SubmitHandler<EventInputs> = async (data) => {
        const dateWithoutTime = data.date.toDate();
        dateWithoutTime.setHours(0, 0, 0, 0);

        const newSchedule = {
            title: data.title,
            date: Timestamp.fromDate(dateWithoutTime),
            userId: currentUser?.id,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
        } as EventDocumentWithId;
        addSchedule(newSchedule, currentCategory);
        handleClose();
        // todo: snackbar
    };

    return (
        <>
            {open && (
                <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
                        <DialogContent className="my-4 mx-4">
                            <ToggleButtonGroup
                                className="bg-slate-100 rounded-full "
                                value={currentCategory}
                                exclusive
                                fullWidth
                                onChange={(event, newType) => {
                                    if (newType != null) {
                                        setCurrentCategory(newType);
                                    }
                                }}
                            >
                                <CustomToggleButton key={ScheduleCategories.PLAN} value={ScheduleCategories.PLAN} className="sm:text-lg rounded-l-full">
                                    登校予定
                                </CustomToggleButton>
                                <CustomToggleButton key={ScheduleCategories.EVENT} value={ScheduleCategories.EVENT} className="sm:text-lg rounded-r-full">
                                    イベント
                                </CustomToggleButton>
                            </ToggleButtonGroup>
                            {currentCategory === ScheduleCategories.PLAN && (
                                <>
                                    <form onSubmit={planHandleSubmit(onSubmitPlan)}>
                                        <Stack spacing={3} className="mt-10">
                                            <DateProvider>
                                                <Controller name="date" control={planControl} rules={{ required: { value: true, message: "Date is required" } }}
                                                    render={({ field, fieldState }) => (
                                                        <DatePicker {...field}
                                                            label="日付"
                                                            defaultValue={dayjs()}
                                                            minDate={dayjs()}
                                                            value={field.value || ""}
                                                            onChange={field.onChange}
                                                            format="YYYY年M月D日"
                                                            views={["day"]}
                                                            slotProps={{
                                                                toolbar: {
                                                                    toolbarFormat: "YYYY年M月D日",
                                                                },
                                                                dialog: {
                                                                    sx: styles.mobiledialogprops,
                                                                },
                                                            }}
                                                            className="w-full" />
                                                    )}
                                                />
                                            </DateProvider>
                                            <Button type="submit" variant="contained" className="rounded-full px-10 ml-auto py-4 md:text-base">登校する</Button>
                                        </Stack>
                                    </form>
                                </>
                            )}
                            {currentCategory === ScheduleCategories.EVENT && (
                                <form onSubmit={eventHandleSubmit(onSubmitEvent)}>
                                    <Stack spacing={3} className="mt-10">
                                        <Alert severity="warning" className="">(2023/10/04) 追加後、アプリから削除・変更ができないため、登録するときは注意すること</Alert>

                                        <DateProvider>
                                            <Controller name="title" control={eventControl} rules={{ required: { value: true, message: "Title is required" } }}
                                                render={({ field, fieldState }) => (
                                                    <TextField {...field}
                                                        label="タイトル"
                                                        defaultValue={""}
                                                        value={field.value || ""}
                                                        onChange={field.onChange}
                                                        className="w-full" />
                                                )}
                                            />
                                            <Controller name="date" control={eventControl} rules={{ required: { value: true, message: "Date is required" } }}
                                                render={({ field, fieldState }) => (
                                                    <DatePicker {...field}
                                                        label="日付"
                                                        defaultValue={dayjs()}
                                                        minDate={dayjs()}
                                                        value={field.value || ""}
                                                        onChange={field.onChange}
                                                        format="YYYY年M月D日"
                                                        views={["day"]}
                                                        slotProps={{
                                                            toolbar: {
                                                                toolbarFormat: "YYYY年M月D日",
                                                            },
                                                            dialog: {
                                                                sx: styles.mobiledialogprops,
                                                            },
                                                        }}
                                                        className="w-full" />
                                                )}
                                            />
                                        </DateProvider>
                                        <Button type="submit" variant="contained" className="rounded-full px-10 ml-auto py-4 md:text-base">登録する</Button>
                                    </Stack>
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
