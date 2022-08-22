import GenericFeature from "../../generics/GenericFeature"

function Imei({ value, name, container, handleChange, title, handleRemove }) {

    return (
        <>
            <div className="form-group">
                <GenericFeature type="number" value={value} name={name} container={container} title={title} handleChange={handleChange}></GenericFeature>
                <button type="button" className="btn-close mt-4" onClick={handleRemove} aria-label="Close"></button>
            </div>
        </>
    )
}
export default Imei