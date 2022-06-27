
import { useState, useEffect } from "react"
import CellForm from "./CellForm"
function FormContent({ deviceNumber, currentPage }) {
    const [option, setOption] = useState("1")
    const [currentOption, setCurrentOption] = useState("")

    const handleOption = () => {
        setCurrentOption(option)
    }

    const optionSwitch = () => {
        switch (currentOption) {
            case "1":
                return <CellForm deviceNumber={deviceNumber}></CellForm>
            case "2":
                return "Formulario de PC"
            case "3":
                return "Formulario de algo mas"
            default:
                break;
        }
    }
    
    const getFormBody = () => {
        return (
            <>
                <h3 className="mt-3">Dispositivo N° {deviceNumber}</h3>
                <div className="input-group w-25">
                    <select className="form-select" value={option} onChange={(e) => setOption(e.target.value)} aria-label="Default select example">
                        <option value={"1"}>Celular</option>
                        <option value={"2"}>PC</option>
                        <option value={"3"}>Comodin</option>
                    </select>
                    <button className="btn btn-success" onClick={handleOption}>Aceptar</button>
                </div>
                {
                    (currentOption !== "")
                        ?
                        optionSwitch()
                        :
                        ""
                }
            </>
        )
    }

    return (
        <>

            {(deviceNumber === currentPage)
                ?
                <div className="">
                    {getFormBody()}
                </div>
                :
                <div className="d-none">
                    {getFormBody()}
                </div>
            }
        </>
    )
}

export default FormContent