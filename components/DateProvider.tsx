import "dayjs/locale/ja";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React from "react";


dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");
dayjs.tz.setDefault("Asia/Tokyo");

type Props = {
    children: React.ReactNode
}

export default function DateProvider({ children }: Props) {
    return (
        <>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ja"
                dateFormats={{ monthAndYear: "YYYY年 MM月" }}
            >
                {children}
            </LocalizationProvider>
        </>
    );
}
