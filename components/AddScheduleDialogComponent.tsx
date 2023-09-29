import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";

import AddScheduleDialog from "./AddScheduleDialog";

export default function AddScheduleDialogComponent() {
    const [dialogOpen, setDialogOpen] = useState(false);

    const addSchedule = () => {
        setDialogOpen(true);
    };

    return (
        <>
            <Button variant="contained" onClick={addSchedule}>予定を追加する</Button>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="jaJP">
                <AddScheduleDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} />
            </LocalizationProvider>
        </>
    );
}
