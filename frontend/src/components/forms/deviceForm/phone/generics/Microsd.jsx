function Microsd({value1, value2, handleObjectChange}) {
    return (
        <>
            <div className="row mt-3">
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="micro-type">Tipo</label>
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={value1}
                            container="microsd"
                            name="type"
                            onChange={handleObjectChange}
                            id="micro-type"
                            required
                        ></input>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group">
                        <label htmlFor="micro-capacity">Capacidad</label>
                        <input
                            type="number"
                            className="form-control"
                            minLength={15}
                            defaultValue={value2}
                            name="capacity"
                            container="microsd"
                            onChange={handleObjectChange}
                            id="micro-capacity"
                            required
                        ></input>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Microsd