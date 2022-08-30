import GenericFeature from "../../generics/GenericFeature"
import { useState } from "react"
function Imei({ value, name, container, handleChange, title, handleRemove, remove }) {

    const [disabled, setDisabled] = useState(remove === true)

    const handleDisabled = () => { setDisabled(!disabled) }

    return (
        <>
            <div className="form-group">
                <div className="input-group">
                    <fieldset style={{ width: "90%" }} disabled={disabled}>
                        <GenericFeature type="text" value={value} name={name} container={container} title={title} handleChange={handleChange}></GenericFeature>
                    </fieldset>
                    <button type="button" className={`btn ${disabled ? "btn-secondary" : "btn-outline-secondary"} mt-4`} onClick={() => { handleRemove(); handleDisabled() }} aria-label="Close">{disabled ? "O" : "X"}</button>
                </div>
            </div>
        </>
    )
}
export default Imei