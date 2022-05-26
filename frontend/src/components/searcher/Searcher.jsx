
import { useState } from "react"
import DateSearcher from "./DateSearcher"
function Searcher() {
    const [value, setValue] = useState(null)
    const handleValueOption = (option) => setValue(option)
    const handleReturn = () => setValue(null)

    function getComponent() {
        switch (value) {
            case "0":
                return <DateSearcher props={0}></DateSearcher>
            case "1":
                return <DateSearcher props={1}></DateSearcher>
            case "2":
                return <DateSearcher props={2}></DateSearcher>
            case "3":
                return <h3>{value}</h3>
            default:
                return <h4>{value}</h4>
        }
    }

    return (

        <>
            <div className="p-3 bg-light">
                {(value !== null) ?
                    <>
                        {getComponent()}
                        <button className="btn btn-secondary" onClick={() => handleReturn()}>Volver</button>
                    </>
                    :
                    < div >
                        <h3 className="mt-3">Buscador</h3>
                        <h4>Parámetro de búsqueda: </h4>
                        <div className="form-group">
                            <select className="form-select mb-3 w-25 m-3" id="optSelect" style={{ display: "inline-block" }}>
                                <option value={0} selected>Fecha de ingreso</option>
                                <option value={1} >Fecha de egreso</option>
                                <option value={2} >Fecha de turno</option>
                                <option value={3} >Auxiliar</option>
                                <option value={4} >Estado</option>
                            </select>
                            <button className="btn btn-primary" onClick={() => handleValueOption(document.getElementById("optSelect").value)}>Ingresar</button>
                        </div>
                    </div>
                }
            </div>

        </>

    )
}
export default Searcher