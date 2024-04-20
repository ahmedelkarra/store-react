import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../config/api';
import { DataGrid } from '@mui/x-data-grid';



const columns = [
    { field: 'prodcutId', headerName: 'Prodcuts', width: 150 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'name', headerName: 'name', width: 150 },
    { field: 'email', headerName: 'email', width: 150 },
];




export default function Admin() {
    const dispatch = useDispatch()
    const apiInfo = Api
    let products = apiInfo({ url: "products" })
    const users = useSelector((state) => state.user.users)
    const orders = useSelector((state) => state.orders.orders)

    const rows = users.map((order, index) => {
        let user = getUser(order.id)
        let product = getProduct(order.product)
        return { ...user, ...product, }
    })



    function getUser(id) {
        let user = users.find((ele) => ele.id == id)
        return { ...user, userId: user?.id }
    }

    function getProduct(id) {
        let product = products.find((ele) => ele.id == id)
        return { ...product, productId: product?.id }
    }

    console.log(users)

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </div>
    );
}
