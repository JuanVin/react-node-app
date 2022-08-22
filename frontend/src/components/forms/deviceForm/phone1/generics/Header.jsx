function Header({ title, handleAdd }) {
    return (
        <div className="form-group">
            <div className="row">
                <div className="col">
                    <h3>{title}</h3>
                </div>
                <div className="col">
                    <button type="button" className="btn btn-success" onClick={handleAdd}>Agregar</button>
                </div>
            </div>
        </div>
    )
}
export default Header