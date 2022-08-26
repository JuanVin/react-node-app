
import GenericFeature from "../../generics/GenericFeature";
import { useState } from "react"

function Simcard({ number, company, container, handleChange, handleRemove, remove }) {

    const [disabled, setDisabled] = useState(remove === true)

    const handleDisabled = () => { setDisabled(!disabled) }

    return (
        <>
            <div className="row">
                <div className="col">
                    <GenericFeature type="text" value={number} name="number" container={container} disabled={disabled} title="Número" handleChange={handleChange}></GenericFeature>
                </div>
                <div className="col">
                    <GenericFeature type="text" value={company} name="company" container={container} disabled={disabled} title="Compañía" handleChange={handleChange}></GenericFeature>
                </div>
                <button type="button" className="btn-close mt-4" onClick={() => { handleRemove(); handleDisabled() }} aria-label="Close"></button>
            </div>
        </>
    )
}
export default Simcard