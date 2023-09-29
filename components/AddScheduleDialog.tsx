import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import React, { useState } from "react";


type Props = {
    open: boolean;
    handleClose: () => void;
    defaultDate?: Dayjs;
}

enum AddTypes {
    plan = "plan",
    event = "event"
}

dayjs.extend(utc);
dayjs.extend(timezone);

export default function AddScheduleDialog({ open, handleClose, defaultDate = dayjs().tz("Asia/Tokyo") }: Props) {
    const [currentType, setCurrentType] = useState(AddTypes.plan);

    const CustomToggleButton = styled(ToggleButton)(({ }) => ({
        "&.Mui-selected, &.Mui-selected:hover": {
            color: "black",
            backgroundColor: blue[200],
        }
    }));

    return (
        <>
            {open && (
                <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
                        <DialogContent className="mt-5 mb-5">
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <ToggleButtonGroup
                                    className="bg-slate-100"
                                    value={currentType}
                                    exclusive
                                    fullWidth
                                    onChange={(event, newType) => {
                                        if (newType != null) {
                                            setCurrentType(newType);
                                        }
                                    }}
                                >
                                    <CustomToggleButton key={AddTypes.plan} value={AddTypes.plan}>登校予定</CustomToggleButton>
                                    <CustomToggleButton key={AddTypes.event} value={AddTypes.event}>イベント</CustomToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                            <Box sx={{ m: "auto", mt: 5 }}>
                                {currentType === AddTypes.plan && (
                                    <Stack direction="row" spacing={3}>
                                        <DatePicker label="日付" defaultValue={defaultDate} />
                                        <Button variant="contained" className="rounded-full">登校する</Button>
                                        {/* <DialogActions className="mr-3 mb-3">
                                            <Button variant="outlined" onClick={handleClose}>キャンセル</Button>
                                            <Button variant="contained" onClick={handleClose}>追加</Button>
                                        </DialogActions> */}
                                    </Stack>
                                )}
                                {currentType === AddTypes.event && (
                                    <Stack>
                                        Item Two
                                    </Stack>
                                )}
                            </Box>
                        </DialogContent>
                    </Dialog>
                </Box >
            )
            }
        </>
    );
}
