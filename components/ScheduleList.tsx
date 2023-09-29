import Stack from "@mui/material/Stack";

import { useDataBaseStore } from "@/store/DataBaseProvider";

export default function ScheduleList() {
    const { users, schedules } = useDataBaseStore();


    const getUsername = (userId: string) => {
        return users.find((u) => u.id === userId)?.name;
    };

    return (
        <Stack spacing={2} className="mt-5">
            <ul>
                {schedules.map((schedule) => (
                    <li key={schedule.id}>{`${getUsername(schedule.userId)}:  ${schedule.title}" ${schedule.date}`}</li>
                ))}
            </ul>
        </Stack>
    );
}
