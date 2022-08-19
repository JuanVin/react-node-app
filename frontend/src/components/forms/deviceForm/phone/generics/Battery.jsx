function Battery({value1, value2, handleObjectChange}) {
    return (
        <>
            <div className="row mt-3">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="simcard">Marca</label>
                        <input type="text" value={value1} name="brand" container="battery" onChange={handleObjectChange} className="form-control" id="simcard" required
                        ></input>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="company">Modelo</label>
                        <input type="text" value={value2} name="model" container="battery" onChange={handleObjectChange} className="form-control" id="company" required
                        ></input>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Battery