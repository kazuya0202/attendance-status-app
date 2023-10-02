import EventIcon from "@mui/icons-material/Event";
import { Avatar, Box, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import clsx from "clsx";
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

import { formatDateSimply } from "@/lib/dayjsUtility/util";
import { ScheduleState } from "@/lib/entity";
import { addSchedule, deleteSchedule } from "@/lib/firebase";
import * as libUtil from "@/lib/util";
import { useDataBaseStore } from "@/store/DataBaseProvider";

import BasicPopover from "./Modify";

type ItemGroup = {
    plans: ScheduleState[];
    events: ScheduleState[];
}


export default function ScheduleList() {
    const { schedules } = useDataBaseStore();
    const [group, setGroup] = useState<ItemGroup[]>([]);

    useEffect(() => {
        const sortByDate = libUtil.groupBy(schedules, (schedule) => schedule.date.seconds)
            .map(([date, items]) => ([...items]));
        const sortByCategory = Array.from(sortByDate.values()).map((items: ScheduleState[]) => ({
            plans: items.filter((item) => item.category === "plan"),
            events: items.filter((item) => item.category === "event"),
        } as ItemGroup));
        // console.log(sortByDate);
        // console.log(sortByCategory);
        setGroup(sortByCategory);
    }, [schedules]);

    return (
        <>
            <Box sx={{ my: 4 }} >
                <Stack direction="row" className="mb-2 ml-2">
                    <EventIcon className="my-auto" />
                    <Typography variant="h6" className="ml-2 my-auto">
                        今後の予定
                    </Typography>
                </Stack>
                <Grid container spacing={2}>
                    {group.map((item, index) => (
                        <ScheduleItem key={index} plans={item.plans} events={item.events} />
                    ))}
                </Grid>
            </Box>
        </>
    );
}

const ScheduleItem = ({ plans, events }: ItemGroup) => {
    const { users, currentUser } = useDataBaseStore();
    const [documentIdOfCurrentUser, setDocumentIdOfCurrentUser] = useState<string | undefined>(undefined);

    const [enabled, setEnabled] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    const [relativeDate, setRelativeDate] = useState<"today" | "tomorrow" | null>(null);

    const getUsername = (userId: string) => {
        return users.find((u) => u.id === userId)?.name;
    };

    const isMine = (plan: ScheduleState) => {
        return currentUser?.id === plan.userId;
    };

    useEffect(() => {
        const doc = plans.find((p) => p.userId === currentUser?.id);
        setDocumentIdOfCurrentUser(doc?.id);
        if (plans.length > 0) {
            const d = plans[0].date.toDate();
            d.setHours(0, 0, 0, 0);
            setDate(d);
        }
    }, [setDocumentIdOfCurrentUser, plans, currentUser]);

    useEffect(() => {
        const diff = dayjs(date).diff(dayjs(), "day", true);
        // console.log(diff);
        if (-1 <= diff && diff < 0) {
            setRelativeDate("today");
        } else if (/* 0 <= diff && */ diff < 1) {
            setRelativeDate("tomorrow");
        } else {
            setRelativeDate(null);
        }
    }, [date]);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        if (documentIdOfCurrentUser) {
            deleteSchedule(documentIdOfCurrentUser);
        } else {
            // console.log("document was not found");
            const newSchedule = {
                title: "登校",
                date: Timestamp.fromDate(date),
                category: "plan",
                userId: currentUser?.id,
            } as ScheduleState;
            addSchedule(newSchedule);
        }
        setEnabled(false);
    }, [currentUser?.id, date, documentIdOfCurrentUser, enabled]);

    return (
        <>
            <Grid item xs={12} sm={6} lg={4} xl={3}>
                <Stack direction="column" className="bg-white rounded-lg py-3 px-5 shadow shadow-gray-300 group hover:shadow-md transition">
                    {plans.length > 0 && (
                        <Stack direction="row" className="flex justify-around">
                            {/* <Chip
                                className="w-fit text-base px-1 relative -top-3 -left-0 py-4
                                    rounded-tl-none rounded-br-md rounded-tr-none rounded-bl-md bg-gray-500 text-white"
                                label={formatDateSimply(dayjs(date))}
                                size="small"
                            /> */}
                            <Box className="w-fit px-2 relative -top-3 -left-0 flex items-center
                                    rounded-tl-none rounded-br-md rounded-tr-none rounded-bl-md bg-gray-500 text-white"
                            >
                                <Typography variant="body1" sx={{ fontSize: 14 }} className="">
                                    {formatDateSimply(dayjs(date))}
                                </Typography>
                                <Typography variant="body1" sx={{ fontSize: 14 }} className="">
                                    {relativeDate === "today" && (
                                        <Chip component={"span"} size="small" label="今日" className="bg-slate-200 ml-3" />
                                    ) || relativeDate === "tomorrow" && (
                                        <Chip component={"span"} size="small" label="明日" className="bg-slate-200 ml-3" />
                                    )
                                    }
                                </Typography>
                            </Box>

                            <BasicPopover date={date} hasOwn={Boolean(documentIdOfCurrentUser)} onButtonClick={() => setEnabled(true)} />
                        </Stack>
                    )}
                    <Stack direction={"row"} className="flex justify-end flex-row-reverse">
                        {plans.map((plan, index) => (
                            <Box key={index} className="-mr-3 mb-2">
                                <Avatar
                                    className={clsx(
                                        isMine(plan) && "bg-green-600" || "bg-slate-700",
                                        "border-solid border-2 border-white")}
                                >
                                    {getUsername(plan.userId)?.charAt(0).toUpperCase()}
                                </Avatar>
                            </Box>
                        ))}
                    </Stack>
                </Stack>
            </Grid >
        </>
    );
};
