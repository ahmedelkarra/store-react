import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Api from "../config/api";
import { useDispatch, useSelector } from "react-redux";
import { doneLoading } from "../redux/reducers/user";
import Loading from "../components/loading";



const ProductesDetails = () => {
    const dispatch = useDispatch()
    let loading = useSelector((state) => state.user.loading)
    let { id } = useParams()
    let getApiInfo = Api({ url: `products/${id}` })
    console.log(id)
    useEffect(() => {
        dispatch(doneLoading())
        console.log(loading)
    }, [])
    return (
        <div style={{ margin: "20px auto", width: "80%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" , gap:"20px"}}>
            {loading && <Loading />}
            <img src={getApiInfo.image} width={300} draggable='false' />
            <h2>{getApiInfo.title}</h2>
            <h2>{getApiInfo.price} €</h2>
            <h3 style={{ textAlign: "center" }}>{getApiInfo.description}</h3>
        </div>
    )
}

export default ProductesDetails