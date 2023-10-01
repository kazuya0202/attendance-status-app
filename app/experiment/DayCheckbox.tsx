import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { FormControl, FormControlLabel, FormGroup, Stack } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { blue } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Props = {

}

type Inputs = {
    checks: boolean[]
}

const CheckboxComponent = styled(Checkbox)(() => ({
    "&.MuiCheckbox-root": {
        // border: "solid 1px"
        // boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.2)"
    },
    "&.Mui-checked": {
        // backgroundColor: blue[200],
    }
}));

const DayCheckbox = ({ }: Props) => {
    const { control, handleSubmit } = useForm<Inputs>({
        defaultValues: {
            checks: [false, false, false],
        }
    });

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        console.log(`submit: ${data.checks.join(", ")}}`);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            console.log("clicked");
        }
    };

    return (
        <>
            <Stack component="form" noValidate onSubmit={handleSubmit(onSubmit)} spacing={2} sx={{ m: 2, width: "25ch" }}>

                {/* <FormControlLabel fullWidth error={errors.checkerr !== undefined}> */}
                <FormControl fullWidth>
                    Form Title
                    <FormGroup>
                        <Controller
                            name={`checks.${0}`}
                            control={control}
                            // rules={validationRules.checks}
                            render={({ field }) => (
                                <FormControlLabel
                                    className="rounded-md shadow-sm px-3 pt-2 pb-1 w-fit border border-gray-800"
                                    label="チェック 1"
                                    labelPlacement="top"
                                    control={
                                        <CheckboxComponent
                                            {...field}
                                            checked={field.value}
                                            value={"test"}
                                            icon={<RadioButtonUncheckedIcon />}
                                            checkedIcon={<CheckCircleIcon />}
                                        />}
                                />
                            )}
                        />
                    </FormGroup>
                </FormControl>
            </Stack >
        </>
    );
};

export default DayCheckbox;
