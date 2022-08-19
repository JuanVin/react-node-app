import GenericFeature from "../../generics/GenericFeature";

function Microsd({ option, typeValue, capacityValue, typeName, capacityName, container, handleChange }) {
    const getMicrosdForm = () => {
        switch (option) {
            case "1":
                return (
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <GenericFeature type="text" value={typeValue} name={typeName} container={container} title="Tipo" handleChange={handleChange}></GenericFeature>
                            </div>
                            <div className="col">
                                <GenericFeature type="number" value={capacityValue} name={capacityName} container={container} title="Capacidad" handleChange={handleChange}></GenericFeature>
                            </div>
                        </div>
                    </div>
                )
            default:
                break;
        }
    }
    return (
        <>
            {getMicrosdForm()}
        </>
    )
}
export default Microsd