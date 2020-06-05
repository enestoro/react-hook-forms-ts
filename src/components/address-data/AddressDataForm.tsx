import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import * as yup from 'yup';
import {Controller, useFormContext} from 'react-hook-form';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 40
    }
});

const countries = ['Germany', 'Great Britain', 'Italy', 'Poland'];

export const addressValidationSchema = {
    street: yup.string().required('Is required'),
    houseNo: yup.string().required('Is required'),
    zipCode: yup.string().required('Is required'),
    city: yup.string().required('Is required'),
    country: yup.string().required('Is required')
};

export default function AddressDataForm(props: { addressType: any; header: React.ReactNode; }) {
    const classes = useStyles();
    const addressType = props.addressType;
    const { register, errors, control } = useFormContext();
    const handleChange = ([event]: any) => {
       return event.target.value
    };

    return (
        <div className={classes.container}>
            <Typography variant="h6" align="left">
                {props.header}
            </Typography>
            <TextField
                name={`${addressType}.street`}
                error={!!errors[addressType]?.street}
                inputRef={register}
                helperText={errors[addressType]?.street?.message}
                label="Street"
            />
            <TextField
                name={`${addressType}.houseNo`}
                error={!!errors[addressType]?.houseNo}
                inputRef={register}
                helperText={errors[addressType]?.houseNo?.message}
                label="House no"
            />
            <TextField
                name={`${addressType}.zipCode`}
                error={!!errors[addressType]?.zipCode}
                inputRef={register}
                helperText={errors[addressType]?.zipCode?.message}
                label="Zip code"
            />
            <TextField
                name={`${addressType}.city`}
                error={!!errors[addressType]?.city}
                inputRef={register}
                helperText={errors[addressType]?.city?.message}
                label="City"
            />
            <Controller
                as={
                    <TextField select>
                        {countries.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                }
                name={`${addressType}.country`}
                control={control}
                defaultValue={''}
                label="Country"
                error={!!errors[addressType]?.country}
                helperText={errors[addressType]?.country?.message}
                onChange={handleChange}
            />
        </div>
    );
}
