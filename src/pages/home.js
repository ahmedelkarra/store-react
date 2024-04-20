import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "../config/api";
import { Card, CardActionArea, CardContent, CardMedia, Grid, MenuItem, Stack, Typography, Select, TextField, InputLabel, FormControl, CardActions, Button } from "@mui/material";
import user, { addcategory, doneLoading } from "../redux/reducers/user";
import { Link } from "react-router-dom";
import Loading from "../components/loading";
import LoginMessage from "../components/loginMessage";
import ConfirmMsg from "../components/confirmMsg";


const Home = () => {
    const dispatch = useDispatch()
    const apiInfo = Api
    const category = useSelector((ele) => ele.user.category)
    const online = useSelector((ele) => ele.user.online)
    const user = useSelector((ele) => ele.user.user)
    const orders = useSelector((state) => state.orders.orders)
    dispatch(addcategory(apiInfo({ url: "products/categories" })))
    const [search, setSearch] = useState("")
    const [categoryValue, setCategoryValue] = useState('all')
    const [confimOpen, setConfimOpen] = useState(false)
    const [login, setlogin] = useState(false)
    const [orderId, setOrderId] = useState(null)
    let loading = useSelector((state) => state.user.loading)
    let setValueForAll = apiInfo({ url: "products" })

    const handleClose = () => {
        setlogin(false)
        setConfimOpen(false)
        setOrderId(null)
    }

    const handleOrder = (id) => {
        if (online) {
            setOrderId(id)
            setConfimOpen(true)
        } else {
            setlogin(true)
        }
    }

    if (category && categoryValue !== 'all') {
        setValueForAll = setValueForAll.filter((ele) => ele?.category?.includes(categoryValue))
    } else {
        setValueForAll = setValueForAll.filter((ele) => ele?.category?.includes(""))
    }
    if (category) {
        setValueForAll = setValueForAll.filter((ele) => {
            return ele?.title?.includes(search) || ele?.price?.toString().includes(search)
        })
    }
    const handleChange = (e) => {
        setCategoryValue(e.target.value)
    }
    const checkProduct = (id) => {
        let userId = user.id
        let ordred = orders.some((item) => item.user == userId && item.product == id)
        return ordred
    }

    useEffect(() => {
        dispatch(doneLoading())
    }, [])

    return (
        <>
            <Stack direction="row" spacing={2} margin={"5vh auto"} sx={{ width: { md: "60%", xs: "80%" }, margin: "5vh auto" }} >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={categoryValue}
                        label="Category"
                        onChange={handleChange}
                    >
                        < MenuItem value={"all"} >All</MenuItem>
                        {
                            apiInfo({ url: "products/categories" }).map((ele, index) => {
                                return (
                                    < MenuItem value={ele} key={index}>{ele}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
                <TextField id="standard-basic" label="Seartch" variant="outlined" fullWidth onChange={(e) => setSearch(e.target.value)} />
            </Stack >
            {loading && <Loading />}
            <Grid container spacing={2} marginTop={"20px"} margin={"5vh auto"}>
                {setValueForAll.map((ele, index) => {
                    return (
                        <Grid item key={index} lg={3} md={4} sm={6} xs={12}>
                            <Card sx={{ maxWidth: "300px"}}>
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
                                    <Link>
                                        <Button disabled={checkProduct(ele.id)} onClick={() => handleOrder(ele.id)} size="small" color="info" variant="contained">Order Now</Button>
                                    </Link>
                                    <Link to={`/products/${ele.id}`}>
                                        <Button size="small" color="success" variant="contained">More Details</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid >
            <LoginMessage open={login} handleClose={handleClose} />
            <ConfirmMsg open={confimOpen} handleClose={handleClose} id={orderId} />
        </>
    )
}

export default Home