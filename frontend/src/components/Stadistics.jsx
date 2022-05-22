import { useEffect, useState } from "react"
import apis from './apiFunctions';
import BarGraphic from "./BarGraphic";
import PendingFilesTable from "./PendingFilesTable";

function Stadistics() {
    const [fileStadistic, setFileStadistic] = useState(null)
    const [technicianStadistic, setTechnicianStadistic] = useState(null)
    const [pendingFiles, setPendingFiles] = useState(null)

    async function postFetchData() {
        let startDate = new Date(document.getElementById("start").value),
            endDate = new Date(document.getElementById("end").value),
            response = await apis.getStadisticsByDate({ start: startDate, end: endDate })
        console.log(response)
        setFileStadistic(response.fileStadistic)
        setTechnicianStadistic(response.technicianStadistic)
        setPendingFiles(response.pendingFiles)
    }

    return (
        <>
            <div className="bg-light shadow p-3 rounded">
                <h1 className="p-3">Estadísticas</h1>
                <div className="form-group">
                    <label className="p-3" for="start">Fecha de inicio:</label>
                    <input type="date" id="start" style={{ display: "inline-block" }} className="form-control w-25"></input>
                    <label className="p-3" for="end">Fecha de fin:</label>
                    <input type="date" id="end" style={{ display: "inline-block" }} className="form-control w-25"></input>
                    <button className="btn btn-success m-3" onClick={postFetchData}>Ingresar</button>
                </div>
                <hr className="mt-5"></hr>
                {(!fileStadistic && !technicianStadistic) ?
                    ""
                    :
                    <div className='row'>
                        <h3 className="text-center p-3">Registros entre: <span style={{ color: "orange" }}>{document.getElementById("start").value}</span> y <span style={{ color: "orange" }}>{(document.getElementById("end").value)}</span></h3>
                        <div className="col">
                            <h3 className='p-3 text-center'>Cantidad de registros: <span style={{ color: "orange" }}>{fileStadistic[fileStadistic.length - 1].total}</span></h3>
                            <BarGraphic props={{ data: fileStadistic, opt: 0 }}></BarGraphic>
                        </div>
                        <div className="col">
                            <h3 className='text-center p-3'>Archivados (<span style={{ color: "rgb(0, 180, 120)" }}>{fileStadistic[5].amount}</span>) - Falta entregar (<span style={{ color: "rgb(0, 138, 180)" }}>{fileStadistic[4].amount}</span>)</h3>
                            <BarGraphic props={{ data: technicianStadistic, opt: 1 }}></BarGraphic>
                        </div>
                        <hr className="mt-3"></hr>
                        <h2 className="p-3">Expedientes por comenzar: </h2>
                        <div className="p-5">
                            <PendingFilesTable props={pendingFiles}></PendingFilesTable>
                        </div>

                    </div>
                }
            </div>
        </>
    )
}
export default Stadistics

