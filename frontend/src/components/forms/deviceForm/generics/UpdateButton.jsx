function UpdateButton({ deviceInfo, setDisabled }) {
    return (
        <button className="btn btn-success text-center" onClick={() => setDisabled(true)}>
            {
                deviceInfo
                    ?
                    "Actualizar"
                    :
                    "Cargar"
            }
        </button>
    )
}

export default UpdateButton