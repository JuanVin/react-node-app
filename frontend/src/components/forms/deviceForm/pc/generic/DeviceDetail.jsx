function DeviceDetail({ container, value, name, handleChange, title }) {
    return (
        <div className="form-group">
            <label htmlFor="deviceDetail">{title}</label>
            <textarea id="deviceDetail" defaultValue={value} name={name} container={container} onChange={handleChange} className="form-control"></textarea>
        </div>
    )
}
export default DeviceDetail