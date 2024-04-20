import { LinearProgress } from "@mui/material"
import { useSelector } from "react-redux"




const Loading = () => {
    return (
        < LinearProgress
            color="primary"
            fourColor={false}
            variant="query"
        />
    )
}


export default Loading