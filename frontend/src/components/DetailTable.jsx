import { useState } from "react"
import apis from "./apiFunctions"
function DetailTable(params) {
    console.log(params)
    const [showTextArea, setShowTextArea] = useState(0)
    const [message, setMessage] = useState(null)

    const [details, setDetails] = useState(params.details)
    const handleShowTextArea = (index) => setShowTextArea(index)
    const handleCloseTextArea = () => setShowTextArea(0)

    let trParam = []

    async function postUpdDetail(id, index) {
        let response
        try {
            response = await apis.updateDetail(
                {
                    detail_id: id,
                    detail: document.getElementById("newDetail" + id).value
                }
            )
            if (response) {
                details[index] = response.detail
                setDetails(details)
            }
        } catch (error) {
            console.log(error)
        }
        setMessage({ message: response.message })
        handleCloseTextArea()
    }

    details.map((param, index) => {
        trParam.push(
            <tr key={param.id}>
                <th>{index + 1}</th>
                {
                    (showTextArea !== 0 && showTextArea === param.id)
                        ?
                        <>
                            <td><textarea className="form-control" defaultValue={param.detail} id={"newDetail" + param.id}></textarea></td>
                            <td><button className="btn btn-outline-warning w-100" onClick={() => { postUpdDetail(param.id, index) }}> <b>Agregar</b> </button></td>
                            <td><button className="btn btn-outline-primary w-100" onClick={handleCloseTextArea}> <b>Volver</b> </button></td>
                        </>
                        :
                        <>
                            <td>{(param.detail !== "") ? param.detail : "Sin detalle"}</td>
                            <td><button className="btn btn-outline-success" onClick={() => handleShowTextArea(param.id)}> <b>Modificar</b> </button></td>
                            <td><button className="btn btn-outline-danger"> <b>Borrar  </b> </button></td>
                        </>

                }
            </tr>
        )
    })
    function postStatus() {
        if (message != null)
            if (message.status === 200) {
                return (
                    <div class="alert alert-success d-flex align-items-center mt-3" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                        <div>
                            {message.message}
                        </div>
                    </div>
                )
            } else {
                return (
                    <div class="alert alert-danger d-flex align-items-center mt-3" role="alert">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                        <div>
                            {message.message}
                        </div>
                    </div>
                )
            }
        return null
    }
    return (
        <>
            {postStatus()}
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Detalle</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {trParam}
                </tbody>
            </table>
        </>
    )
}

export default DetailTable