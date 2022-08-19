import GenericFeature from "../../generics/GenericFeature"

function Disk({ formValues, handleChange }) {
    return (
        <>
            <h3>Disco</h3>
            <div className="row">
                <div className="col">
                    <GenericFeature type="text" name="brand" value={formValues.disk.brand} container="disk" handleChange={handleChange} title="Marca"></GenericFeature>
                </div>
                <div className="col">
                    <GenericFeature type="text" name="model" value={formValues.disk.model} container="disk" handleChange={handleChange} title="Modelo"></GenericFeature>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <GenericFeature type="text" name="sn" value={formValues.disk.sn} container="disk" handleChange={handleChange} title="S/N"></GenericFeature>
                </div>
                <div className="col">
                    <GenericFeature type="number" name="capacity" value={formValues.disk.capacity} container="disk" handleChange={handleChange} title="Capacidad"></GenericFeature>
                </div>
            </div>
        </>
    )
}
export default Disk