import apis from "../apiFunctions";
import { useState } from "react"
import AccordionFile from "../AccordionFile";
function DateSearcher(param) {
    const [data, setData] = useState(null)
    const dateTypes = ["Fecha de Ingreso", "Fecha de Egreso", "Fecha de Turno"];

    async function postData() {
        let body = document.getElementById("date").value
        let files
        if (param.props === 0) {
            setData(await apis.getFileByAdmissionDate(body))
        } else if (param.props === 1) {
            setData(files = await apis.getFileByEgressDate(body))
        } else if (param.props === 2) {
            setData(await apis.getFileByShiftDate(body))
        }
    }

    return (
        <>
            <div className="p-3">
                <h2>Filtro: {dateTypes[param.props]}</h2>
                <label style={{ fontSize: "20px" }} className="p-3" for="start">Fecha de búsqueda:</label>
                <input type="date" id="date" style={{ display: "inline-block" }} className="form-control w-25"></input>
                <button className="btn btn-success m-1" onClick={postData}>Ingresar</button>
                {
                    (data !== null) ?
                        <div className="w-50 mt-3">
                            <AccordionFile data={{ files: data, option: "a5" }}></AccordionFile>
                        </div>
                        :
                        ""
                }
            </div>
        </>
    )
}
export default DateSearcher