const Technician = ({handleChange, technicianId, loadTechnician}) => {

    return (
        <>
            <label className="p-1" htmlFor="tecnico_act">
                Técnico{" "}
            </label>
            <select
                className="form-control"
                name="technicianId"
                value={technicianId}
                onChange={handleChange}
                id="tecnico_act"
                required
            >
                {loadTechnician}
            </select>
        </>
    )
}
export default Technician