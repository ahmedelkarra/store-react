import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, login } from "../redux/reducers/user";
import { errorMsg, sccsessMsg } from "../components/infoMsg";



const Login = () => {
    console.log("hello from Login page")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const users = useSelector((state) => state.user.users)
    const online = useSelector((state) => state.user.online)
    console.log(online)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: "",
        },
        onSubmit: ({ email, password }) => {
            // alert(JSON.stringify(values, null, 2));
            const user = users.find((ele) => ele.email === email)
            if (!user) {
                return errorMsg("Email Not Valid")
            }
            const pass = users.find((ele) => ele.password === password)
            if (!pass) {
                return errorMsg("Worng Password")
            } else {
                sccsessMsg(`Welcome ${user?.firstName} ${user?.lastName} `)
                dispatch(login(user))
                setTimeout(() => {
                        navigate('/home')
                    }, 1000)
            }
        },
    });
    return (
        <Box sx={{ margin: "10vh auto", width: "80%" }}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={4}>
                    <Grid children xs={12} md={6} >
                        <TextField id="standard-basic" name="email" onChange={formik.handleChange} value={formik.values.email} label="Email" variant="outlined" type="email" fullWidth />
                    </Grid>
                    <Grid children xs={12} md={6} >
                        <TextField id="standard-basic" name="password" onChange={formik.handleChange} value={formik.values.password} label="Password" variant="outlined" type="password" fullWidth />
                    </Grid>
                    <Grid xs={12} children>
                        <Button variant="contained" type="submit" sx={{ display: "block", margin: "10px auto" }}>Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    )
}

export default Login