const Dates = ({ date, handleChange, name, type, title }) => {
    return (
        <>
            <label className="p-1">
                Fecha {title}
            </label>
            <input
                className="form-control"
                type={type}
                name={name}
                value={date}
                onChange={handleChange}
                min="2022-01-01"
                max="2100-06-14"
            ></input>
        </>
    )
}

export default Dates