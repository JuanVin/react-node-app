import apis from "../apiCalls";
import { useState, useEffect } from "react"
import AccordionFile from "../commons/AccordionFile";
import Loading from "../commons/Loading"
function TechnicianSearcher(param) {
    const [data, setData] = useState(null)
    const [technician, setTechnician] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (localStorage.getItem("data") !== null) {
            getTechnicianFromLocalStorage()
        }
        else {
            getTechnicianFromApiCall()
        }
    }, [isLoading])

    const getTechnicianFromLocalStorage = () => {
        setTechnician(JSON.parse(localStorage.getItem("data")).technicians)
        setIsLoading(false)
    }
    const getTechnicianFromApiCall = async () => {
        setTechnician(await apis.getTechnicians())
        setIsLoading(false)
    }

    function loadTechnician() {
        let techData = []
        techData.push(
            <option value={0}>No asignado</option>
        )
        technician.forEach(technician => {
            techData.push(
                <option value={technician.id}>{(technician.name).toUpperCase()}</option>
            )
        })
        return techData
    }
    async function postData() {
        let body = {
            technician: document.getElementById("tecnico_act").value,
            startDate: document.getElementById("start").value,
            endDate: document.getElementById("end").value
        }
        setData(await apis.getFilesByTechnician(body))
    }

    if (isLoading) {
        return (
            <Loading></Loading>
        )
    }
    return (
        <>
            <div className="p-3">
                <h2>Filtro: Técnico</h2>
                <div className="mt-3 form-group w-25">
                    <label className="p-1" for="tecnico_act">Técnico </label>
                    <select className="form-control" id="tecnico_act" required>
                        {loadTechnician()}
                    </select>
                </div>
                <div style={{ display: "inline-block" }} className="mt-3 form-group w-25">
                    <label className="p-1" for="start">Fecha de Inicio </label>
                    <input type="date" id="start" style={{ display: "inline-block" }} className="form-control"></input>
                </div>
                <div style={{ display: "inline-block" }} className="mt-3 m-3 form-group w-25">
                    <label className="p-1" for="end">Fecha final </label>
                    <input type="date" id="end" style={{ display: "inline-block" }} className="form-control"></input>
                </div>

                <button className="btn btn-success m-1" onClick={postData}>Ingresar</button>
                <hr></hr>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {
                        (data !== null) ?
                            <div className="w-50 mt-3">
                                <AccordionFile data={{ files: data, option: "a5" }}></AccordionFile>
                            </div>
                            :
                            ""
                    }
                </div>
            </div>
        </>
    )
}
export default TechnicianSearcher