import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from 'formik';
import React from "react";
import { errorMsg, sccsessMsg } from "../components/infoMsg";
import { useDispatch, useSelector } from "react-redux";
import user, { addUser } from "../redux/reducers/user";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const users = useSelector((state) => state.user.users)
    console.log(users)
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: '',
            password: "",
            confirmPassowrd: "",
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            if (values.password !== values.confirmPassowrd) return errorMsg("Password not match")
            dispatch(addUser(values))
            setTimeout(() => {
                navigate('/login')
            }, 1000)
        },
    });
    return (
        <Box sx={{ margin: "10vh auto", width: "80%" }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" name="firstName" onChange={formik.handleChange} value={formik.values.firstName} label="First Name" variant="outlined" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField id="standard-basic" name="lastName" onChange={formik.handleChange} value={formik.values.lastName} label="Last Name" variant="outlined" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" name="email" onChange={formik.handleChange} value={formik.values.email} label="Email" variant="outlined" type="email" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" name="password" onChange={formik.handleChange} value={formik.values.password} label="Passowrd" variant="outlined" type="password" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField id="standard-basic" name="confirmPassowrd" onChange={formik.handleChange} value={formik.values.confirmPassowrd} label="Confirm Passowrd" variant="outlined" type="password" fullWidth />
                    </Grid>
                    <Grid xs={12} item>
                        <Button variant="contained" type="submit" sx={{ display: "block", margin: "10px auto" }}>Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default Register