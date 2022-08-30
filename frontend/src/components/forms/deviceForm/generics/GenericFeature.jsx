function GenericFeature({ container, value, name, handleChange, title, type }) {
    return (
        <div className="form-group">
            <label>{title}</label>
            <input type={type} defaultValue={value} name={name} container={container} onChange={handleChange} className="form-control"></input>
        </div>
    )
}
export default GenericFeature