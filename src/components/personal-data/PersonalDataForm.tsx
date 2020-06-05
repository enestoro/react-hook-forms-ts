import {makeStyles} from "@material-ui/core/styles";
import {TextField, Typography} from "@material-ui/core";
import React from 'react';
import * as yup from 'yup';
import {useFormContext} from "react-hook-form";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 40
    }
});

export const personalDataFormSchema = {
    firstName: yup.string().required('Is required'),
    surname: yup.string().required('Is required'),
    email: yup
        .string()
        .required('Is required')
        .email('Invalid format'),
    repeatEmail: yup
        .string()
        .required('Is required')
        .email('Invalid format')
        .oneOf([yup.ref('email'), null], 'Emails are not the same')
};

export default function PersonalDataForm() {
    const classes = useStyles();
    const { register, errors } = useFormContext();

    return (
        <div className={classes.container}>
            <Typography variant="h6" align="left">
                Personal Data
            </Typography>
            <TextField
                name="firstName"
                label="First name"
                error={!!errors.firstName}
                inputRef={register}
                helperText={errors.firstName?.message}
            />
            <TextField
                name="surname"
                error={!!errors.surname}
                inputRef={register}
                helperText={errors.surname?.message}
                label="Surname"
            />
            <TextField
                name="email"
                error={!!errors.email}
                inputRef={register}
                helperText={errors.email?.message}
                label="Email"
            />
            <TextField
                name="repeatEmail"
                error={!!errors.repeatEmail}
                inputRef={register}
                helperText={errors.repeatEmail?.message}
                label="Repeat your email"
            />
        </div>
    );
}
