import { Box, CircularProgress, Stack } from "@mui/material";

export default function PageLoading() {
    return (
        <>
            <Stack direction="column" spacing={2} className="mt-20" alignItems="center">
                <CircularProgress className="text-gray-600 opacity-60" />
                <Box>Loading...</Box>
            </Stack>
        </>
    );
}
