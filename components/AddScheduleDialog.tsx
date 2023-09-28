import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

export default function AddScheduleDialog() {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const addSchedule = () => {
        handleClickOpen();

    };


    const [tabValue, setTabValue] = useState("plan");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue);
    };

    return (
        <>
            <Button variant="contained" onClick={addSchedule}>予定を追加する</Button>
            {open && (
                <Box sx={{ width: "100%", height: "500px", bgcolor: "background.paper" }}>
                    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
                        <DialogContent>
                            <TabContext value={tabValue}>
                                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                    <Tabs value={tabValue} onChange={handleChange} centered>
                                        <Tab value="plan" label="登校予定" className="text-lg" />
                                        <Tab value="event" label="イベント" className="text-lg" />
                                    </Tabs>
                                </Box>
                                <TabPanel value="plan">
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        // id="name"
                                        label="Email Address"
                                        type="email"
                                        fullWidth
                                        variant="standard"
                                    />
                                </TabPanel>
                                <TabPanel value="event">
                                    Item Two
                                </TabPanel>
                            </TabContext>
                        </DialogContent>
                        <DialogActions className="mr-3 mb-3">
                            <Button variant="outlined" onClick={handleClose}>キャンセル</Button>
                            <Button variant="contained" onClick={handleClose}>追加</Button>
                        </DialogActions>
                    </Dialog>
                </Box >
            )
            }
        </>
    );
}
