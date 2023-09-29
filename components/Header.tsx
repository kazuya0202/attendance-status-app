"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { AlertColor } from "@mui/material/Alert";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FirebaseError } from "firebase/app";
import { getAuth, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect, useState } from "react";

import CustomSnackbar, { SnackbarControllerProps } from "@/components/Snackbar";
import { useAuthContext } from "@/context/AuthContext";


export default function Header() {
    const router = useRouter();
    const { user } = useAuthContext();

    const [snackbarController, setSnackbarController] = useState<SnackbarControllerProps>(
        { severity: "info", message: "", open: false }
    );

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getAuthElement = () => {
        if (user) {
            return (
                <>
                    <IconButton
                        color="inherit"
                        onClick={handleClick}
                        aria-controls={open ? "menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        className="rounded-md"
                    >
                        {/* <Avatar>{currentUser?.name[0]}</Avatar> */}
                        <AccountCircleIcon fontSize="large" />
                        <Typography variant="h6" component="div" className="ml-2">設定</Typography>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        id="menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        transformOrigin={{ horizontal: "right", vertical: "top" }}
                        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                        <MenuItem onClick={() => { handleClose(); router.push("/mypage"); }}>
                            <ListItemIcon>
                                <AccountCircleIcon fontSize="small" />
                            </ListItemIcon>
                            マイページ
                        </MenuItem>
                        <MenuItem onClick={() => { handleClose(); handleLogOut(); }}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            ログアウト
                        </MenuItem>
                    </Menu>
                </>
            );
        }

        return <></>;
    };

    const handleLogOut = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            setSnackbarController({ severity: "success", message: "ログアウトしました", open: true });
            router.push("/login");
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.log(e);
            }
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => router.push("/")} className="mr-auto" >
                        <Typography variant="h6" component="div">
                            登校予定管理ツール
                        </Typography>
                    </Button>
                    {getAuthElement()}
                </Toolbar>
            </AppBar>

            <CustomSnackbar
                {...snackbarController}
                open={snackbarController.open}
                onClose={() => setSnackbarController({ ...snackbarController, open: false })}
            />
        </Box>
    );
}
