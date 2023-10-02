import EditIcon from "@mui/icons-material/Edit";
import { IconButton, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import dayjs from "dayjs";
import React, { useState } from "react";

import { formatDate } from "@/lib/dayjsUtility/util";


type Props = {
    date: Date;
    hasOwn: boolean;
    onButtonClick: () => void;
}

export default function BasicPopover({ date, hasOwn, onButtonClick }: Props) {
    const [anchorEl, setAnchorEl] = useState<EventTarget & HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getElement = () => {
        const fmtDate = formatDate(dayjs(date));
        const content = hasOwn ? `${fmtDate}の予定を取り消しますか？` : `${fmtDate}に予定を登録しますか？`;
        const btnLabel = hasOwn ? "取り消す" : "登録する";
        return (
            <>
                <Stack flexDirection={"column"} alignContent={"end"} spacing={1} className="m-5">
                    <Typography variant="body1" className="my-auto">
                        {content}
                    </Typography>
                    <Button
                        onClick={() => { onButtonClick(); handleClose(); }}
                        variant={hasOwn && "outlined" || "contained"}
                        className={
                            clsx(
                                hasOwn && "border-red-500 text-red-500",
                                "rounded-full px-4 ml-auto"
                            )}
                    >
                        {btnLabel}
                    </Button>
                </Stack >
            </>
        );
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            <IconButton
                aria-describedby={id}
                color="inherit"
                onClick={handleClick}
                className="rounded-full mt-0 ml-auto w-fit h-auto text-gray-500 opacity-50 md:opacity-0 group-hover:opacity-50 transition"
                size="small">
                {/* <BorderColorIcon /> */}
                <EditIcon />
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                {getElement()}
            </Popover>
        </>
    );
}
