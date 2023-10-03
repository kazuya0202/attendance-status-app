import { PickersDayProps } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import React, { useState } from "react";

import AddScheduleDialog from "@/components/AddScheduleDialog";
import DateProvider from "@/components/DateProvider";


export default function DateCalendarComponent() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <DateProvider>
                {/* view only */}
                <DateCalendar readOnly value={dayjs()} views={["day"]} />

                {/* <DateCalendar
                    value={selectedDate}
                    onChange={onChangeHandler}
                />
                <AddScheduleDialog open={open} handleClose={() => setOpen(false)} /> */}
            </DateProvider>
        </>
    );
}
