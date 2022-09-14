import GenericFeature from "../../generics/GenericFeature"
import { useState } from "react"

function Battery({ info, handleChange, container, handleRemove }) {

    const [disabled, setDisabled] = useState(info.remove === true)
    const [show, setShow] = useState(true)
    const handleDisabled = () => setDisabled(!disabled)
    const handleShow = () => setShow(!show)
    return (
        <>
            <fieldset disabled={disabled}>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" name="integrated" container="battery" defaultChecked={info.integrated} onChange={handleChange} onClick={handleShow}></input>
                    <label className="form-check-label">
                        Interna/Integrada
                    </label>
                </div>

                {show ?
                    <>

                        <div className="row">
                            <div className="col">
                                <GenericFeature type="text" name="brand" value={info.brand} container={container} handleChange={handleChange} title="Marca"></GenericFeature>
                            </div>
                            <div className="col">
                                <GenericFeature type="text" name="model" value={info.model} container={container} handleChange={handleChange} title="Modelo"></GenericFeature>
                            </div>
                            <div className="col">
                                <GenericFeature type="text" name="sn" value={info.sn} container={container} handleChange={handleChange} title="S/N"></GenericFeature>
                            </div>
                        </div>

                    </>
                    :
                    ""
                }
            </fieldset>
            <button type="button" className={`btn ${disabled ? "btn-secondary" : "btn-outline-secondary"} mt-4`} onClick={() => { handleRemove(); handleDisabled() }} aria-label="Close">{disabled ? "O" : "X"}</button>

        </>
    )
}
export default Battery