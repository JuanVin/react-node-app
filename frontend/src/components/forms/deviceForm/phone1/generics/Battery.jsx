import GenericFeature from "../../generics/GenericFeature";
import { useState } from "react";
function Battery({ brand, model, container, handleChange, handleRemove, remove, integrated }) {
    const [disabled, setDisabled] = useState(remove === true)
    const [show, setShow] = useState(integrated)
    const handleDisabled = () => { setDisabled(!disabled) }
    const handleShow = () => (setShow(!show))

    return (
        <>
            <fieldset disabled={disabled}>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="integrated" container="battery" defaultChecked={integrated} onChange={handleChange} onClick={handleShow}></input>
                    <label className="form-check-label">
                        Interna/Integrada
                    </label>
                </div>
            </fieldset>

            {
                show
                    ?
                    <button type="button" className={`btn ${disabled ? "btn-secondary" : "btn-outline-secondary"} mt-4`} onClick={() => { handleRemove(); handleDisabled() }} aria-label="Close">{disabled ? "O" : "X"}</button>
                    :
                    <div className="input-group">
                        <fieldset style={{ width: "90%" }} disabled={disabled}>
                            <div className="row">
                                <div className="col">
                                    <GenericFeature type="text" value={brand} name="brand" container={container} title="Marca" handleChange={handleChange}></GenericFeature>
                                </div>
                                <div className="col">
                                    <GenericFeature type="text" value={model} name="model" container={container} title="Modelo" handleChange={handleChange}></GenericFeature>
                                </div>
                            </div>
                        </fieldset>
                        <button type="button" className={`btn ${disabled ? "btn-secondary" : "btn-outline-secondary"} mt-4`} onClick={() => { handleRemove(); handleDisabled() }} aria-label="Close">{disabled ? "O" : "X"}</button>
                    </div>
            }

        </>
    )
}
export default Battery