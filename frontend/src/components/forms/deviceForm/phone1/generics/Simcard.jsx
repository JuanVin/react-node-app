
import GenericFeature from "../../generics/GenericFeature";
function Simcard({ number, company, container, handleChange, handleRemove }) {
    return (
        <>
            <div className="row">
                <div className="col">
                    <GenericFeature type="text" value={number} name="number" container={container} title="Número" handleChange={handleChange}></GenericFeature>
                </div>
                <div className="col">
                    <GenericFeature type="text" value={company} name="company" container={container} title="Compañía" handleChange={handleChange}></GenericFeature>
                </div>
                <button type="button" className="btn-close mt-4" onClick={handleRemove} aria-label="Close"></button>
            </div>
        </>
    )
}
export default Simcard