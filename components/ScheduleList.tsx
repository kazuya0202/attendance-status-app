import Stack from "@mui/material/Stack";

import { ScheduleState } from "@/lib/entity";
import { useSchedulesStore } from "@/lib/schedulesStore";
import { useUsersStore } from "@/lib/usersStore";


export default function ScheduleList() {
    const { schedules } = useSchedulesStore();
    const { users } = useUsersStore();

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
