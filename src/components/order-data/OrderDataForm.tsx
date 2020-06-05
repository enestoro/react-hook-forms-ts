import makeStyles from '@material-ui/core/styles/makeStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import React from 'react';
import PersonalDataForm, { personalDataFormSchema } from '../personal-data/PersonalDataForm';
import AddressDataForm, {
    addressValidationSchema
} from '../address-data/AddressDataForm';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useForm, FormContext, Controller} from 'react-hook-form';
import * as yup from 'yup';
import TextField from "@material-ui/core/TextField/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
    checkbox: {
        display: 'flex'
    },
    buttonsPanel: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

const schema = yup.object().shape({
    ...personalDataFormSchema,
    shippingAddress: yup.object().shape(addressValidationSchema),
    shippingBillingAddressDiffer: yup.boolean(),
    billingAddress: yup.object().when('shippingBillingAddressDiffer', {
        is: true,
        then: yup.object().shape(addressValidationSchema)
    })
});

export default function OrderForm() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(false);
    const handleChange = (event: { target: { checked: React.SetStateAction<boolean>; }; }) => {
        setChecked(event.target.checked);
        form.setValue('shippingBillingAddressDiffer', event.target.checked);
    };
    const form = useForm({
        validationSchema: schema,
        mode: 'onBlur'
    });
    const onSubmit = (data: any) => {
        alert(JSON.stringify(data));
    };

    return (
        <Card>
            <CardContent>
                <FormContext {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <PersonalDataForm />
                        <AddressDataForm header="Shipping Address" addressType="shippingAddress" />
                        <FormControlLabel
                            className={classes.checkbox}
                            control={
                                <Checkbox checked={checked} onChange={handleChange} inputRef={form.register} name="shippingBillingAddressDiffer" />
                            }
                            label="Billing and shipping address are not the same"
                        />
                        {checked && <AddressDataForm header="Delivery Address" addressType="billingAddress" />}
                        <CardActions className={classes.buttonsPanel}>
                            <Button type="submit" size="small" variant="contained" color="primary" disabled={!form.formState.isValid}>
                                Order
                            </Button>
                        </CardActions>
                    </form>
                </FormContext>
            </CardContent>
        </Card>
    );
}
