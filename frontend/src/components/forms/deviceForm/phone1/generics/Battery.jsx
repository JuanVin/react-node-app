import GenericFeature from "../../generics/GenericFeature";

function Battery({ brand, model, container, handleChange, handleRemove }) {

    return (
        <>
            <div className="form-group">
                <div className="row">
                    <div className="col">
                        <GenericFeature type="text" value={brand} name="brand" container={container} title="Marca" handleChange={handleChange}></GenericFeature>
                    </div>
                    <div className="col">
                        <GenericFeature type="text" value={model} name="model" container={container} title="Modelo" handleChange={handleChange}></GenericFeature>
                    </div>
                    <button type="button" className="btn-close mt-4" onClick={handleRemove} aria-label="Close"></button>
                </div>
            </div>
        </>
    )
}
export default Battery