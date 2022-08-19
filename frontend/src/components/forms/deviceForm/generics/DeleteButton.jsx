function DeleteButton({ deviceInfo, deleteForm }) {
    return (
        <button type="button" className="btn btn-outline-warning" onClick={deleteForm} style={{ marginLeft: "10px" }}>
            {
                deviceInfo
                    ?
                    "Borrar en DB"
                    :
                    "Borrar"
            }
        </button>
    )
}
export default DeleteButton