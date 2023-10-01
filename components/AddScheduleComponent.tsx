import Button from "@mui/material/Button";
import React, { useState } from "react";

import AddScheduleDialog from "@/components/AddScheduleDialog";
import DateProvider from "@/components/DateProvider";


export default function AddScheduleComponent() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button variant="contained" size="large" onClick={() => setOpen(true)} className="mt-4">
                予定を追加する
            </Button >

            <DateProvider>
                <AddScheduleDialog open={open} handleClose={() => setOpen(false)} />
            </DateProvider>
        </>
    );
}
