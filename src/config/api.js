import { useEffect, useState } from "react";


const Api = ({ url }) => {
    const [data, setData] = useState([])
    const fetchInfo = () => {
        return fetch(`https://fakestoreapi.com/${url}`)
            .then((res) => res.json())
            .then((d) => setData(d))
            .catch((error) => { console.error(error) })
    }
    useEffect(() => {
        fetchInfo();
    }, [])
    return data
}

export default Api