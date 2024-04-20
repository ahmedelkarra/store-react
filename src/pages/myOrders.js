import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "../config/api";
import { Card, CardActionArea, CardContent, CardMedia, Grid, MenuItem, Stack, Typography, Select, TextField, InputLabel, FormControl, CardActions, Button } from "@mui/material";
import user, { addcategory, doneLoading } from "../redux/reducers/user";
import { Link } from "react-router-dom";
import Loading from "../components/loading";
import LoginMessage from "../components/loginMessage";
import ConfirmMsg from "../components/confirmMsg";




const MyOrders = () => {
    const dispatch = useDispatch()
    const apiInfo = Api
    dispatch(addcategory(apiInfo({ url: "products/categories" })))

    let products = apiInfo({ url: "products" })
    const user = useSelector((state) => state.user.user)
    const orders = useSelector((state) => state.orders.orders)
    const myOrders = orders.filter((order) => order?.user === user.id)
    const productsId = myOrders.map((ele) => ele.product)


    const displayedData = products.filter((product) => productsId.includes(product.id))
    console.log(displayedData)
    return (
        <div>
            <Grid container spacing={2} marginTop={"20px"} margin={"5vh auto"}>
                {displayedData.map((ele, index) => {
                    return (
                        <Grid item key={index} lg={3} md={4} sm={6} xs={12}>
                            <Card sx={{ maxWidth: "300px" }}>
                                <CardActionArea>
                                    <CardMedia
                                        sx={{ maxWidth: "100%", height: "250px" }}
                                        component="img"
                                        height="100%"
                                        width='100%'
                                        image={ele.image}
                                        alt="green iguana"
                                        draggable='false'
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {ele.title}
                                        </Typography>
                                        <Typography gutterBottom variant="h6" component="div">
                                            {`${ele.price} €`}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {ele.category}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Link to={`/products/${ele.id}`}>
                                        <Button size="small" color="success" variant="contained">More Details</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid >
        </div>
    )
}


export default MyOrders