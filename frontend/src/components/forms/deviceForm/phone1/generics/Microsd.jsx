import GenericFeature from "../../generics/GenericFeature";
import { useState } from "react";
function Microsd({ type, capacity, container, handleChange, handleRemove, remove }) {

    const [disabled, setDisabled] = useState(remove === true)

    const handleDisabled = () => { setDisabled(!disabled) }

    return (
        <div className="input-group">
            <fieldset style={{ width: "90%" }} disabled={disabled}>
                <div className="row">
                    <div className="col">
                        <GenericFeature type="text" value={type} name="type" container={container} title="Tipo" handleChange={handleChange}></GenericFeature>
                    </div>
                    <div className="col">
                        <GenericFeature type="number" value={capacity} name="capacity" container={container} title="Capacidad" handleChange={handleChange}></GenericFeature>
                    </div>
                </div>
            </fieldset>
            <button type="button" className={`btn ${disabled ? "btn-secondary" : "btn-outline-secondary"} mt-4`} onClick={() => { handleRemove(); handleDisabled() }} aria-label="Close">{disabled ? "O" : "X"}</button>
        </div >
    )
}
export default Microsd