import GenericFeature from "../../generics/GenericFeature";
import { useState } from "react";
function Battery({ brand, model, container, handleChange, handleRemove, remove }) {
    const [disabled, setDisabled] = useState(remove === true)
    const [show, setShow] = useState(remove === true)

    const handleDisabled = () => { setDisabled(!disabled) }
    const handleShow = () => (setShow(!show))
    return (
        <>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" onClick={handleShow} value="" id="defaultCheck1"></input>
                <label class="form-check-label" for="defaultCheck1">
                    Interna/integrada
                </label>
            </div>
            {
                show
                    ?
                    ""
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