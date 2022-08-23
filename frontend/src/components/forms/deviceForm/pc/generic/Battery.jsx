import GenericFeature from "../../generics/GenericFeature"

function Battery({ brand, model, sn, handleChange, container }) {
    return (
        <div className="row">
            <div className="col">
                <GenericFeature type="text" name="brand" value={brand} container={container} handleChange={handleChange} title="Marca"></GenericFeature>
            </div>
            <div className="col">
                <GenericFeature type="text" name="model" value={model} container={container} handleChange={handleChange} title="Modelo"></GenericFeature>
            </div>
            <div className="col">
                <GenericFeature type="text" name="sn" value={sn} container={container} handleChange={handleChange} title="S/N"></GenericFeature>
            </div>
        </div>
    )
}
export default Battery