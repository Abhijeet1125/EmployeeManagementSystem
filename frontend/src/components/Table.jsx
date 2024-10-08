import { useSelector } from "react-redux"

const Table = ({slice})=>{

    const sliceData = useSelector ((state)=> state.slice)

    return (
        <>
            <H1>Table hu mai</H1>
        </>
    )
}

export default Table 