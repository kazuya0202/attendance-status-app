'use client'

import { auth, db } from '@/app/firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router'
import { useState } from 'react'
import Button from '@mui/material/Button'

import Box from '@mui/material/Box'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';

type Inputs = {
    email: string
    password: string
}

export default function Login() {
    // const [email, setEmail] = useState('');
    // const [pwd, setPwd] = useState('');

    const {
        control,
        handleSubmit,
    } = useForm<Inputs>({})

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        doLogin(data)
        console.log(`email: ${data.email}`)
    }

    const doLogin = (data: Inputs) => {
        // * authを定義したものを使うと、firebase.tsを参照するものがないからロードが発生しなかった
        // * firebase.tsからimportしたauthをそのまま使えば認証も通った
        // const auth = getAuth();

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("login success.")
                console.log(user);
            })
            .catch((error) => {
                console.log("error occured.")
                console.log(error);
            })
    }

    return (
        <div className='m-10'>
            <h1>Login Page</h1>

            <Stack component="form" onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                {/* register your input into the hook by invoking the "register" function */}
                <Controller name='email' control={control} defaultValue={""} rules={{
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
                        className='my-3'
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message} />
                )}
                />
                <Controller name='password' control={control} defaultValue={""} rules={{
                    required: { value: true, message: "Password is required" }
                }} render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        // id=""
                        label="Password"
                        variant="outlined"
                        className='my-3'
                        type='password'
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message} />
                )}
                />
                {/* {errors.password && <span>This field is required</span>} */}

                <Button variant='contained' type="submit" className='px-10 py-3 w-fit'>Login</Button>
            </Stack>
        </div>
    )
}
