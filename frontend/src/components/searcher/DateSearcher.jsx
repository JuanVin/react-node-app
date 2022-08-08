import apis from "./../../services/apiCalls";
import { useState } from "react"
import AccordionFile from "../commons/AccordionFile";

function DateSearcher(param) {
    const [data, setData] = useState(null)
    const dateTypes = ["Fecha de Ingreso", "Fecha de Egreso", "Fecha de Turno"];
    const [date, setDate] = useState('')

    async function postData(event) {
        event.preventDefault();
        let query
        if (event.target.checkValidity()) {
            switch (param.props) {
                case 0:
                    query = await apis.getFileByAdmissionDate(date)
                    if (query.status === 200) {
                        setData(query.response)
                    }
                    break;
                case 1:
                    query = await apis.getFileByEgressDate(date)
                    if (query.status === 200) {
                        setData(query.response)
                    }
                    break;
                case 2:
                    query = await apis.getFileByShiftDate(date)
                    if (query.status === 200) {
                        setData(query.response)
                    }
                    break;
                default:
                    break;
            }
        }
    }
    return (
        <>

            <div className="p-3">
                <h2>Filtro: {dateTypes[param.props]}</h2>
                <form onSubmit={(e) => postData(e)}>
                    <label style={{ fontSize: "20px" }} className="p-3" htmlFor="start">Fecha de búsqueda:</label>
                    <div className="input-group mt-1 w-25">
                        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control text-center" required></input>
                        <input type="submit" className="btn btn-success" value="Submit" />
                    </div>
                </form>

                <hr></hr>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {
                        (data !== null) ?
                            <div className="w-50 mt-3">
                                <AccordionFile files={data} option={"a5"}></AccordionFile>
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