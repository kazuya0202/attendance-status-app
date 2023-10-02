import { PickersDayProps } from "@mui/x-date-pickers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";

import AddScheduleDialog from "@/components/AddScheduleDialog";
import DateProvider from "@/components/DateProvider";
import { ScheduleState } from "@/lib/entity";
import { useDataBaseStore } from "@/store/DataBaseProvider";


export default function DateCalendarComponent() {
    const [open, setOpen] = useState(false);
    const { selectedDate, setSelectedDate } = useDataBaseStore();

    const onChangeHandler = (date: dayjs.Dayjs | null) => {
        if (!date) {
            return;
        }
        setSelectedDate(date);
        setOpen(true);
    };

    return (
        <>
            <DateProvider>
                {/* view only */}
                <DateCalendar readOnly value={dayjs()} views={["day"]} />

                {/* <DateCalendar
                    value={selectedDate}
                    onChange={onChangeHandler}
                />
                <AddScheduleDialog open={open} handleClose={() => setOpen(false)} onChange={setSelectedDate} /> */}
            </DateProvider>
        </>
    );
}
