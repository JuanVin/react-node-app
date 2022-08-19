function GenericTextArea({ container, value, name, handleChange, title }) {
    return (
        <div className="form-group">
            <label>{title}</label>
            <textarea defaultValue={value} name={name} container={container} onChange={handleChange} className="form-control"></textarea>
        </div>
    )
}
export default GenericTextArea