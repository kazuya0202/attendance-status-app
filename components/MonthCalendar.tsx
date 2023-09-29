import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useState } from "react";

import AddScheduleDialog from "./AddScheduleDialog";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");

export default function DateCalendarComponent() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(dayjs().tz());  // default: Today

    const onChangeHandler = (e: dayjs.Dayjs | null) => {
        if (!e)
            return;
        setSelectedDate(e.tz());
        setDialogOpen(true);
    };

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="jaJP">
                <DateCalendar
                    value={selectedDate}
                    onChange={onChangeHandler}
                    timezone="Asia/Tokyo"
                />
                <AddScheduleDialog open={dialogOpen} handleClose={() => setDialogOpen(false)} defaultDate={selectedDate} />
            </LocalizationProvider>
        </>
    );
}
