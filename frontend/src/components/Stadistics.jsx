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
                            <h3 className='text-center p-3'>Archivados (<span style={{ color: "rgb(0, 180, 120)" }}>{fileStadistic[5].amount}</span>) - Falta entregar (<span style={{ color: "rgb(0, 138, 180)" }}>{fileStadistic[3].amount}</span>)</h3>
                            <BarGraphic props={{ data: technicianStadistic, opt: 1 }}></BarGraphic>
                        </div>
                        <h2 className="p-3">Porcentajes</h2>
                        <div className="p-5">
                            Total
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: "100%" }} aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">100%</div>
                            </div>
                            Archivados
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: `${(fileStadistic[fileStadistic.length - 1].total/fileStadistic[5].amount)*10}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{Math.trunc((fileStadistic[fileStadistic.length - 1].total/fileStadistic[5].amount)*10)+"%"}</div>
                            </div>
                            Falta Entregar
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: `${(fileStadistic[fileStadistic.length - 1].total/fileStadistic[3].amount)*10}%` }} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">{Math.trunc((fileStadistic[fileStadistic.length - 1].total/fileStadistic[3].amount)*10)+"%"}</div>
                            </div>
                            Turno otorgado
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
                            </div>
                            Falta comenzar
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">100%</div>
                            </div>
                            Sin efecto
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{ width: "35%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">35%</div>
                            </div>
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

