
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import DateSearcher from "./DateSearcher"
import TechnicianSearcher from "./TechnicianSearcher"
import AuthService from "../../services/auth.service"
import checkUserAndRole from "../../services/checkUserAndRole"
import Loading from "../commons/Loading"

function Searcher() {
    const [value, setValue] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const handleValueOption = (option) => setValue(option)
    const handleReturn = () => setValue(null)

    const Navigate = useNavigate()
    useEffect(() => {
        checkUser()
    }, [isLoading])

    async function checkUser() {

        if (await checkUserAndRole.checkAdmin()) {
            setIsLoading(false)
        }
        else if (await checkUserAndRole.checkUser()) {
            Navigate("/")
            window.location.reload();
        }
        else {
            AuthService.logout()
            Navigate("/login")
            window.location.reload();
        }
    }

    function getComponent() {
        switch (value) {
            case "0":
                return <DateSearcher props={0}></DateSearcher>
            case "1":
                return <DateSearcher props={1}></DateSearcher>
            case "2":
                return <DateSearcher props={2}></DateSearcher>
            case "3":
                return <TechnicianSearcher></TechnicianSearcher>
            default:
                return <h4>{value}</h4>
        }
    }
    if (isLoading) {
        return (
            <Loading></Loading>
        )
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
                    <div>
                        <h3 className="mt-3">Buscador</h3>
                        <h4>Parámetro de búsqueda: </h4>
                        <div className="form-group">
                            <div className="input-group mt-1 w-25">
                                <select className="form-select" id="optSelect" style={{ display: "inline-block" }}>
                                    <option value={0} selected>Fecha de ingreso</option>
                                    <option value={1} >Fecha de egreso</option>
                                    <option value={2} >Fecha de turno</option>
                                    <option value={3} >Auxiliar</option>
                                    <option value={4} >Estado</option>
                                </select>
                                <button className="btn btn-primary" onClick={() => handleValueOption(document.getElementById("optSelect").value)}> Ingresar </button>
                            </div>
                        </div>
                    </div>
                }
            </div>

        </>

    )
}
export default Searcher