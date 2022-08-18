function ImeiNumber({name, value, handleObjectChange, title}) {
    return (
        <>
            <label htmlFor="imei">{title}</label>
            <input
                type="number"
                className="form-control"
                defaultValue={value}
                name={name}
                minLength={15}
                container="imei"
                onChange={handleObjectChange}
                required
            ></input>
        </>
    )
}

export default ImeiNumber