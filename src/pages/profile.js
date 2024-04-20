import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import defaultLogo from "../assets/profile.png"
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateDeta } from "../redux/reducers/user";
import { errorMsg, sccsessMsg } from "../components/infoMsg";

const Profile = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const users = useSelector((state) => state.user.users)
    const imageInput = useRef()
    const [imageFile, setImageFile] = useState();
    const [image, setImage] = useState(null)
    const formik = useFormik({
        initialValues: user,

        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            let duplicatedEmail = users.find((ele) => ele.email === values.email && ele.id !== values.id)
            console.log(duplicatedEmail)
            if (duplicatedEmail) {
                return (
                    errorMsg("Email is already taken")
                )
            }
            if (values.password !== values.confirmPassowrd) return errorMsg("Password not match")
            dispatch(updateDeta)
            sccsessMsg("Date is uptaded")
            console.log(formik.values)
        },
    });
    const imageUpdate = () => {
        imageInput.current.click()
    }

    const uploadImage = (selectorFiles) => {
        if (selectorFiles) {
            setImageFile(selectorFiles[0]);
        }
    };
    return (
        <>
            <Box sx={{ margin: "10vh auto", width: "80%" }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2} style={{ alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                        <Grid item xs={12}>
                            <img src={(imageFile && URL.createObjectURL(imageFile)) || defaultLogo} alt="logoImage" height={'120px'} width={'120px'} style={{ borderRadius: "50%" }} />
                            <Button onClick={imageUpdate} variant="contained" type="submit" sx={{ display: "block", margin: "10px auto" }} size="small">Change Profile Photo</Button>
                            <input onChange={(e) => uploadImage(e.target.files)} value={image} type="file" ref={imageInput} style={{ display: "none" }} />
                        </Grid>
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
        </>
    )
}



export default Profile