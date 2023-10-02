"use client";

import LoginIcon from "@mui/icons-material/Login";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import CustomSnackbar, { type SnackbarControllerProps } from "@/components/Snackbar";
import { useDataBaseStore } from "@/store/DataBaseProvider";

type Inputs = {
    email: string
    password: string
}

export default function Login() {
    const router = useRouter();
    const { users, setCurrentUser, currentUser } = useDataBaseStore();

    // snackbar
    const [snackbarController, setSnackbarController] = useState<SnackbarControllerProps>(
        { severity: "info", message: "", open: false }
    );

    // login button
    const [loading, setLoading] = useState(false);

    // form
    const { control, handleSubmit } = useForm<Inputs>({});

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        doLogin(data);
        // console.log(`email: ${data.email}`);
    };

    const doLogin = (data: Inputs) => {
        const auth = getAuth();
        setLoading(true);

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                // * for check behavior
                // const x = users.find((u) => u.id === user.uid);
                // console.log(x);
                // setCurrentUser(x);
                setCurrentUser(users.find((u) => u.id === user.uid));
                // console.log(user);
                router.push("/");
                setSnackbarController({ severity: "success", message: "ログインに成功しました", open: true });
            })
            .catch((e) => {
                setSnackbarController({ severity: "error", message: "ログインに失敗しました", open: true });
            });
        setLoading(false);
    };

    return (
        <div className="mt-10 w-full bg-white mx-auto max-w-sm sm:p-8 sm:max-w-md md:rounded-md md:max-w-md">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack className="mx-4 pb-10 sm:mx-auto sm:p-8 sm:pb-20">
                    <Box component="h1" className="mx-auto">ログイン</Box>
                    <Controller name="email" control={control} defaultValue={""} rules={{
                        required: { value: true, message: "Email is required" }, pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Entered value does not match email format"
                        }
                    }
                    } render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            // id=""
                            label="Email"
                            variant="outlined"
                            className="mb-3"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message} />
                    )}
                    />
                    <Controller name="password" control={control} defaultValue={""} rules={{
                        required: { value: true, message: "Password is required" }
                    }} render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            // id=""
                            label="Password"
                            variant="outlined"
                            className="mb-3"
                            type="password"
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message} />
                    )}
                    />

                    <LoadingButton
                        type="submit"
                        loading={loading}
                        variant="contained"
                        endIcon={<LoginIcon />}
                        loadingPosition="end"
                        size="large"
                        className="px-10 py-3">
                        ログイン
                    </LoadingButton>
                </Stack>
                <CustomSnackbar
                    {...snackbarController}
                    open={snackbarController.open}
                    onClose={() => setSnackbarController({ ...snackbarController, open: false })}
                />
            </form>
        </div>
    );
}
