import { useEffect, useState } from "react"
import AccordionFile from "./AccordionFile"
import apis from "./apiFunctions"

function ShiftDay() {

    let [files, setFiles] = useState([null])
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getFetchData()
    }, [isLoading])

    let getFetchData = async () => {
        let fetchData = await apis.getCurrentDayFiles()
        setFiles(fetchData)
        setIsLoading(false)
    }

    if (isLoading) {
        return (
            <h1>Cargando</h1>
        )
    }

    return (
        <>
            <AccordionFile data={files}></AccordionFile>
        </>
    )
}

export default ShiftDay