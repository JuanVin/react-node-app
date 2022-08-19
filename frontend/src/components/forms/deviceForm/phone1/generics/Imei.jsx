import GenericFeature from "../../generics/GenericFeature"

function Imei({ option, value1, value2, name1, name2, container, handleChange }) {
    const getImeiForm = () => {
        switch (option) {
            case "0":
                return ""
            case "1":
                return (
                    <div className="form-group">
                        <GenericFeature type="number" value={value1} name={name1} container={container} title="Imei 1" handleChange={handleChange}></GenericFeature>
                    </div>
                )
            case "2":
                return (
                    <div className="row">
                        <div className="col">
                            <GenericFeature type="number" value={value1} name={name1} container={container} title="Imei 1" handleChange={handleChange}></GenericFeature>
                        </div>
                        <div className="col">
                            <GenericFeature type="number" value={value2} name={name2} container={container} title="Imei 2" handleChange={handleChange}></GenericFeature>
                        </div>
                    </div>
                )
            default:
                break;
        }
    }
    return (
        <>
            {getImeiForm()}
        </>
    )
}
export default Imei