const Types = ({ handleChange, fileType, loadTypes }) => {
    return (
        <select
            className="form-select d-inline w-25 text-center"
            name="fileType"
            id="tipo_expediente_act"
            value={fileType}
            onChange={handleChange}
        >
            {loadTypes}
        </select>
    )
}

export default Types