import { Grid } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { grey } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { ScheduleState } from "@/lib/entity";
import { addSchedule } from "@/lib/firebase";
import { useDataBaseStore } from "@/store/DataBaseProvider";

import DateProvider from "./DateProvider";


enum Categories {
    plan = "plan",
    event = "event"
}

type PlanInputs = {
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
    const [currentCategory, setCurrentCategory] = useState(Categories.plan);
    const { currentUser } = useDataBaseStore();

    const { control: controlPlan, handleSubmit: handleSubmitPlan } = useForm<PlanInputs>({
        defaultValues: {
            date: dayjs(),
        },
    });

    const onSubmit: SubmitHandler<PlanInputs> = async (data) => {
        const dateWithoutTime = data.date.toDate();
        if (!dateWithoutTime) {
            return;
        }

        dateWithoutTime.setHours(0, 0, 0, 0);
        const newSchedule = {
            title: "登校",
            date: Timestamp.fromDate(dateWithoutTime),
            category: currentCategory,
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
                                <CustomToggleButton key={Categories.plan} value={Categories.plan} className="text-lg rounded-l-full">
                                    登校予定
                                </CustomToggleButton>
                                <CustomToggleButton key={Categories.event} value={Categories.event} className="text-lg rounded-r-full">
                                    イベント
                                </CustomToggleButton>
                            </ToggleButtonGroup>
                            {currentCategory === Categories.plan && (
                                <>
                                    <form onSubmit={handleSubmitPlan(onSubmit)}>
                                        <Grid container className="mt-8 mx-auto grid-flow-col md:grid-flow-row">
                                            <Grid item xs="auto" md className="mx-auto w-full md:max-w-sm md:mx-0">
                                                <DateProvider>
                                                    <Controller name="date" control={controlPlan} rules={{ required: { value: true, message: "Date is required" } }}
                                                        render={({ field, fieldState }) => (
                                                            <DatePicker {...field}
                                                                label="日付"
                                                                defaultValue={dayjs()}
                                                                minDate={dayjs()}
                                                                value={field.value || ""}
                                                                onChange={field.onChange}
                                                                format="YYYY年M月D日"
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
                                            </Grid>
                                            <Grid item xs="auto" className="ml-auto mt-4 md:mt-0 md:ml-4">
                                                <Button type="submit" variant="contained" className="rounded-full px-8 w-full p-4 md:ml-4 md:h-full">登校する</Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </>
                            )}
                            {currentCategory === Categories.event && (
                                <Grid container className="mt-8 mx-auto grid-flow-col md:grid-flow-row w-full">
                                    <Alert severity="info" className="w-full">今後実装予定</Alert>
                                </Grid>
                            )}
                        </DialogContent>
                    </Dialog>
                </Box >
            )
            }
        </>
    );
}
