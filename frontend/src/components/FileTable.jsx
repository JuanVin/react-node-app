import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import CellTable from "./CellTable"
import apis from "./apiFunctions"

function FileTable() {
    const [files, setFiles] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getFetchData()
    },[isLoading])

    const getFetchData = async () => {
        let fetchData = await apis.getCurrentDayFiles()
        console.log(fetchData)
        setFiles(fetchData)
        setIsLoading(false)
    }

    if(isLoading) {
        return (
            <h1>Cargando</h1>
        )
    }

    return (
        <>
        <div className="container" style={{ display: "flex", justifyContent: "center"}}>
            <CellTable data={files}></CellTable>
        </div>        
        </>
    )
}

export default FileTable