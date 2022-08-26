import GenericFeature from "../../generics/GenericFeature"
import { useState } from "react"
function Imei({ value, name, container, handleChange, title, handleRemove, remove, color }) {

    const [disabled, setDisabled] = useState(remove === true)

    const handleDisabled = () => { setDisabled(!disabled) }

    return (
        <>
            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <GenericFeature type="number" value={value} name={name} container={container} disabled={disabled} title={title} handleChange={handleChange}></GenericFeature>
                    </div>
                    <div className="col-md-12 text-right">
                        <button type="button" className="btn-close mt-4" onClick={() => { handleRemove(); handleDisabled() }} aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Imei