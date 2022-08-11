const Offices = ({handleChange, id, name, loadOffices, title}) => {
    return (
        <>
            <label className="p-1">
                {title} Fiscal
            </label>
            <select
                className="form-control"
                name={name}
                value={id}
                onChange={handleChange}
                required
            >
                {loadOffices}
            </select>
        </>
    )
}
export default Offices