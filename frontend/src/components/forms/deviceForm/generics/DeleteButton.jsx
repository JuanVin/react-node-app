function DeleteButton({ deviceInfo, handleDelete }) {
    return (
        <button type="button" className="btn btn-outline-warning" onClick={handleDelete} style={{ marginLeft: "10px" }}>
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