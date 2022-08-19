
import GenericFeature from "../../generics/GenericFeature";
function Simcard({ option, numberValue1, numberValue2, companyValue1, companyValue2, handleChange }) {
    const getSimcardForm = () => {
        switch (option) {
            case "1":
                return (
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <GenericFeature type="text" value={numberValue1} name="number" container="simcard1" title="Número" handleChange={handleChange}></GenericFeature>
                            </div>
                            <div className="col">
                                <GenericFeature type="text" value={companyValue1} name="company" container="simcard1" title="Compañía" handleChange={handleChange}></GenericFeature>
                            </div>
                        </div>
                    </div>
                )
            case "2":
                return (
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <GenericFeature type="text" value={numberValue1} name="number" container="simcard1" title="Número" handleChange={handleChange}></GenericFeature>
                            </div>
                            <div className="col">
                                <GenericFeature type="text" value={companyValue1} name="company" container="simcard1" title="Compañía" handleChange={handleChange}></GenericFeature>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <GenericFeature type="text" value={numberValue2} name="number" container="simcard2" title="Número" handleChange={handleChange}></GenericFeature>
                            </div>
                            <div className="col">
                                <GenericFeature type="text" value={companyValue2} name="company" container="simcard2" title="Compañía" handleChange={handleChange}></GenericFeature>
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
            {getSimcardForm()}
        </>
    )
}
export default Simcard