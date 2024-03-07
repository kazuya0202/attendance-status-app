import EventIcon from "@mui/icons-material/Event";
import { Avatar, Box, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import clsx from "clsx";
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import { React, useEffect, useState } from "react";

import { formatDateSimply } from "@/lib/dayjsUtility/util";
import { EventDocumentWithId, PlanDocumentWithId, ScheduleCategories } from "@/lib/entity";
import { addSchedule, deleteSchedule } from "@/lib/firebase";
import * as libUtil from "@/lib/util";
import { useDataBaseStore } from "@/store/DataBaseProvider";

import BasicPopover from "./Modify";

type ItemGroup = {
    plans: PlanDocumentWithId[];
    events: EventDocumentWithId[];
}

interface plansSortByDate {
    [key: string]: PlanDocumentWithId[];
}
interface eventsSortByDate {
    [key: string]: PlanDocumentWithId[];
}

export default function ScheduleList() {
    const { plans, events } = useDataBaseStore();
    const [group, setGroup] = useState<ItemGroup[]>([]);

    const cvtDateStringToNumber = (dateString: string): number => {
        const parts = dateString.split("-");
        const yyyy = parseInt(parts[0]);
        const mm = parseInt(parts[1]);
        const dd = parseInt(parts[2]);
        return yyyy * 10000 + mm * 100 + dd;
    };

    useEffect(() => {
        const plansByDate: plansSortByDate = {};
        const eventsByDate: eventsSortByDate = {};

        plans.forEach(plan => {
            const date = dayjs(plan.date.toDate()).format("YYYY-MM-DD");
            if (!plansByDate[date]) {
                plansByDate[date] = [];
            }
            plansByDate[date].push(plan);
        });

        events.forEach(event => {
            const date = dayjs(event.date.toDate()).format("YYYY-MM-DD");
            if (!eventsByDate[date]) {
                eventsByDate[date] = [];
            }
            eventsByDate[date].push(event);
        });

        // どちらも同じ日付のキーを持つようにする
        const allDates = [...new Set([...Object.keys(plansByDate), ...Object.keys(eventsByDate)])];
        allDates.forEach(date => {
            plansByDate[date] = plansByDate[date] || [];
            eventsByDate[date] = eventsByDate[date] || [];
        });
        const sortByDate = allDates.sort((a, b) => cvtDateStringToNumber(a) - cvtDateStringToNumber(b));
        const itemGroup = sortByDate.map((date) => {
            return {
                // return [date, plansByDate[date], eventsByDate[date]];
                plans: plansByDate[date],
                events: eventsByDate[date],
            };
        });

        // console.log(itemGroup);
        setGroup(itemGroup);
    }, [events, plans]);

    return (
        <>
            <Box sx={{ my: 4 }} >
                <Stack direction="row" className="mb-2 ml-2">
                    <EventIcon className="my-auto" />
                    <Typography variant="h6" className="ml-2 my-auto">
                        今後の予定debug
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

    const isMine = (plan: PlanDocumentWithId) => {
        return currentUser?.id === plan.userId;
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        //setAnchorEl(event.currentTarget);
        console.log("Button Clicked");
    };

    useEffect(() => {
        const doc = plans.find((p) => p.userId === currentUser?.id);
        setDocumentIdOfCurrentUser(doc?.id);
        if (plans.length > 0) {
            const d = plans[0].date.toDate();
            d.setHours(0, 0, 0, 0);
            setDate(d);
        } else if (events.length > 0) {
            const d = events[0].date.toDate();
            d.setHours(0, 0, 0, 0);
            setDate(d);
        }
    }, [setDocumentIdOfCurrentUser, plans, currentUser, events]);

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
            deleteSchedule(documentIdOfCurrentUser, ScheduleCategories.PLAN);
        } else {
            // console.log("document was not found");
            //TODO スケジュール追加
            console.log(currentUser?.id);
            console.log(currentUser);
            
            const newSchedule = {
                title: "登校",
                date: Timestamp.fromDate(date),
                userId: currentUser?.id,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now(),
            } as PlanDocumentWithId;
            addSchedule(newSchedule, ScheduleCategories.PLAN);
        }
        setEnabled(false);
    }, [currentUser?.id, date, documentIdOfCurrentUser, enabled]);

    return (
        <>
            <Grid item xs={12} sm={6} lg={4} xl={3} className="items-stretch grid-flow-row">
                <Stack direction="column" className="bg-white rounded-lg py-3 px-5 shadow shadow-gray-300 group hover:shadow-md transition">
                    {(plans.length > 0 || events.length > 0) && (
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

                    {/*TODO 登録したEventのUI表示*/}
                    <Stack direction="column" className="">
                        {events.map((event, index) => (
                            <Button
                            onClick={handleClick}
                            >
                                <Box key={index} className="mb-2">
                                    <Typography
                                        className={"rounded-md bg-indigo-200 px-3 py-1"}
                                    >
                                        {event.title}
                                    </Typography>
                                </Box>
                            </Button>
                        ))}
                    </Stack>

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
