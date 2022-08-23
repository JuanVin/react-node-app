import GenericFeature from "../../generics/GenericFeature"

function Disk({ brand, model, sn, capacity, container, handleChange, title }) {
    return (
        <>
            <h4 className="text-secondary">- {title}</h4>
            <div className="row">
                <div className="col">
                    <GenericFeature type="text" name="brand" value={brand} container={container} handleChange={handleChange} title="Marca"></GenericFeature>
                </div>
                <div className="col">
                    <GenericFeature type="text" name="model" value={model} container={container} handleChange={handleChange} title="Modelo"></GenericFeature>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <GenericFeature type="text" name="sn" value={sn} container={container} handleChange={handleChange} title="S/N"></GenericFeature>
                </div>
                <div className="col">
                    <GenericFeature type="number" name="capacity" value={capacity} container={container} handleChange={handleChange} title="Capacidad"></GenericFeature>
                </div>
            </div>
        </>
    )
}
export default Disk