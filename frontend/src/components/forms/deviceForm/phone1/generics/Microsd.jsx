import GenericFeature from "../../generics/GenericFeature";

function Microsd({ type, capacity, container, handleChange, handleRemove }) {

    return (
        <div className="form-group">
            <div className="row">
                <div className="col">
                    <GenericFeature type="text" value={type} name="type" container={container} title="Tipo" handleChange={handleChange}></GenericFeature>
                </div>
                <div className="col">
                    <GenericFeature type="number" value={capacity} name="capacity" container={container} title="Capacidad" handleChange={handleChange}></GenericFeature>
                </div>
                <button type="button" className="btn-close mt-4" onClick={handleRemove} aria-label="Close"></button>
            </div>
        </div>
    )
}
export default Microsd