import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import DateProvider from "../../components/DateProvider";


interface IFormInput {
    date: Dayjs
}

export default function TestForm() {
    const { control, handleSubmit } = useForm<IFormInput>({
        defaultValues: {
            date: dayjs()
        }
    });

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="date"
                control={control}
                render={({ field, fieldState: { error } }) => {
                    return <DateProvider>
                        <DatePicker {...field}
                            label="Date"
                            value={field.value || dayjs()}
                            onChange={field.onChange}
                            slotProps={{
                            }} />
                    </DateProvider>;
                }}
                rules={{ required: true }}
            />

            <Button type="submit">submit</Button>
        </form>
    );
}
