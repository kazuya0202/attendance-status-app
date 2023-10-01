import { Dayjs } from "dayjs";

const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];

export const formatDateSimply = (date: Dayjs): string => {
    return `${date.format("M月 D日")}｜${dayOfWeek[date.day()]}`;
};

export const formatDate = (date: Dayjs): string => {
    return `${date.format("M月 D日")}（${dayOfWeek[date.day()]}）`;
};
