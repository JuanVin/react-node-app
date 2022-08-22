import { useState, useEffect, memo } from "react";
import { useSearchParams } from "react-router-dom"
import Loading from "../../../commons/Loading";
import Message from "../../../commons/Message";
import Notebook from "./Notebook";
import Desktop from "./Desktop";
function PcForm({ info }) {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true)
    const [formOptions, setFormOptions] = useState(
        {
            selectedDevice: "1"
        }
    )

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormOptions({ ...formOptions, [name]: value })
    }

    const getForm = () => {
        switch (formOptions.selectedDevice) {
            case "1":
                return <Notebook info={{...info, type: 2}}></Notebook>
            case "2":
                return <Desktop info={{...info, type: 3}}></Desktop>
            default:
                break;
        }
    }

    return (
        <>
            <div className="p-3">
                <div className="input-group w-50">
                    <select className="form-control" value={formOptions.selectedDevice} name="selectedDevice" onChange={handleChange} id="simcardSelect">
                        <option value="1">Notebook</option>
                        <option value="2">Pc escritorio</option>
                    </select>
                    <button type="button" className="btn btn-success">Aceptar</button>
                </div>
                {getForm()}
            </div>

        </>
    )
}
export default PcForm