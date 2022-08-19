function UpdateButton({ deviceInfo }) {
    return (
        <button className="btn btn-success text-center">
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