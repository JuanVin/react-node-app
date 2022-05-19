import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import apis from "./apiFunctions"
import NavBar from "./NavBar"
import Loading from "./Loading"
import AccordionExtraction from "./AccordionExtraction"
const Extraction = () => {
    let { id } = useParams()
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [showDevicesFields, setshowDevicesFields] = useState(false)

    const handleShowDevices = () => setshowDevicesFields(true)
    const handleHideDevices = () => setshowDevicesFields(false)

    useEffect(() => {
        getFetchData()
    }, [isLoading])

    const getFetchData = async () => {
        let fetchData = await apis.getFileById(id)
        await setData(fetchData)
        setIsLoading(false)
        console.log(data)

    }
    if (isLoading) {
        return (
            <>
                <Loading></Loading>
            </>
        )
    }

    function loadDevicesFields() {
        let getNumberOfDevices = document.getElementById("numberOfDevices").value

        return (
            <>
                <AccordionExtraction props={
                    getNumberOfDevices === null ? 0 : getNumberOfDevices
                }></AccordionExtraction>
            </>
        )
    }

    return (
        <>
            <NavBar></NavBar>
            <div className="container ">
                <div className="p-5 bg-light" style={
                    {
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto"
                    }
                }>
                    <h2><b>Extracciones</b></h2>
                    <h3 className="mt-1" style={{ color: "grey" }}>Expte N° {data.FileType.type.toUpperCase() + "- " + data.file_number}</h3>
                    <hr></hr>
                    {
                        showDevicesFields
                            ?
                            <>
                                <button className="btn btn-outline-success mt-1" onClick={handleHideDevices}>Volver</button>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "center"
                                }}>
                                    {loadDevicesFields()}

                                </div>
                            </>
                            :
                            <>
                                <label for="numberOfDevices" className="p-1 mt-3">Número de dispositivos</label>
                                <div className="input-group w-25">
                                    <input type="number" className="form-control" id="numberOfDevices" defaultValue={0}></input>
                                    <button className="btn btn-success" onClick={handleShowDevices}>Cargar</button>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default Extraction