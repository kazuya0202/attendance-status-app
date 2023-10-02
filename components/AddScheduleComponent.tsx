import { Box, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";

import AddScheduleDialog from "@/components/AddScheduleDialog";
import DateProvider from "@/components/DateProvider";

import AddScheduleButton from "./BottomNavigation";


export default function AddScheduleComponent() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Box className="md:mt-4">
                <AddScheduleButton handleClick={() => setOpen(true)} />

                <DateProvider>
                    <AddScheduleDialog open={open} handleClose={() => setOpen(false)} />
                </DateProvider>
            </Box >
        </>
    );
}
