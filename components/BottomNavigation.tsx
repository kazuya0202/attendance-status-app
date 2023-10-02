"use client";

import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import RestoreIcon from "@mui/icons-material/Restore";
import { Button, IconButton, Typography } from "@mui/material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


type Props = {
    handleClick: () => void;
}

const AddScheduleButton = ({ handleClick }: Props) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* over md */}
            <Button variant="contained" size="large" onClick={handleClick}
                className="bg-primary py-3 px-4 pr-5 hidden sm:flex"
                sx={{ color: "white", borderRadius: "0.375rem" }}
                startIcon={<AddCircleIcon fontSize="medium" />}>
                <Typography variant="body1">
                    予定を追加する
                </Typography>
            </Button >

            {/* under sm */}
            <Box sx={{ position: "fixed", bottom: 20, right: 20 }} className="sm:hidden z-50">
                <IconButton onClick={handleClick} className="bg-primary p-3 rounded-full shadow shadow-gray-400" sx={{ color: "white", borderRadius: "0.375rem" }}>
                    <AddIcon fontSize="large" />
                </IconButton>
            </Box>
        </>
    );
};

export default AddScheduleButton;
