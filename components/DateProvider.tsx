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
                localeText={{
                    previousMonth: "前月を表示",
                    nextMonth: "次月を表示",
                    cancelButtonLabel: "キャンセル",
                    okButtonLabel: "選択",
                }}
            >
                {children}
            </LocalizationProvider>
        </>
    );
}
