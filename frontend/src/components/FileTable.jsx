import { useEffect, useState, useParams } from "react"
import CellTable from "./CellTable"
import apis from "./apiFunctions"
import NavBar from "./NavBar"

function FileTable() {

    const [files, setFiles] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getFetchData()
    },[isLoading])

    const getFetchData = async () => {
        let fetchData = await apis.getCurrentDayFiles()
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
        <NavBar></NavBar>
        <div className="container" style={{ display: "flex", justifyContent: "center"}}>
            <CellTable data={files}></CellTable>
        </div>        
        </>
    )
}

export default FileTable