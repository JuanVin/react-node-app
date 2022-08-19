import GenericFeature from "../../generics/GenericFeature";

function Battery({ option, brandValue, modelValue, brandName, modelName, container, handleChange }) {
    const getBatteryForm = () => {
        switch (option) {
            case "1":
                return (
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <GenericFeature type="text" value={brandValue} name={brandName} container={container} title="Marca" handleChange={handleChange}></GenericFeature>
                            </div>
                            <div className="col">
                                <GenericFeature type="text" value={modelValue} name={modelName} container={container} title="Modelo" handleChange={handleChange}></GenericFeature>
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
            {getBatteryForm()}
        </>
    )
}
export default Battery