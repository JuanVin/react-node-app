import apis from "../apiCalls";
import { useState } from "react"
import AccordionFile from "../commons/AccordionFile";

function DateSearcher(param) {
    const [data, setData] = useState(null)
    const dateTypes = ["Fecha de Ingreso", "Fecha de Egreso", "Fecha de Turno"];

    async function postData() {
        let body = document.getElementById("date").value
        switch (param.props) {
            case 0:
                setData(await apis.getFileByAdmissionDate(body))
                break;
            case 1:
                setData(await apis.getFileByEgressDate(body))
                break;
            case 2:
                setData(await apis.getFileByShiftDate(body))
                break;
            default:
                //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
                break;
        }
    }

    return (
        <>
            <div className="p-3">
                <h2>Filtro: {dateTypes[param.props]}</h2>
                <label style={{ fontSize: "20px" }} className="p-3" for="start">Fecha de búsqueda:</label>
                <input type="date" id="date" style={{ display: "inline-block" }} className="form-control w-25"></input>
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
export default DateSearcher