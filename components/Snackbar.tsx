import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import React from "react";

export type SnackbarControllerProps = {
    severity: AlertColor;
    message: string;
    open: boolean;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type Props = {
    severity: AlertColor;
    message: string;
    open: boolean;
    onClose: () => void;
}


// export default function CustomizedSnackbars(props) {
const CustomSnackbar = ({ severity, message, open, onClose }: Props) => {
    return (
        <Snackbar open={open} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default CustomSnackbar;
