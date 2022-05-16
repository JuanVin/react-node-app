import { useState } from "react"
import apis from "./apiFunctions"
import Message from "./Message"
function DetailTable(params) {

    const [message, setMessage] = useState(null)
    const [details, setDetails] = useState(params.details)
    const [showOptions, setShowOptiones] = useState({ index: null, opt: null })
    const handleShowTextArea = (index, opt) => setShowOptiones({ index: index, opt: opt })
    const handleCloseTextArea = () => setShowOptiones({ index: null, opt: null })
    const handleShowWarning = (index, opt) => setShowOptiones({ index: index, opt: opt })


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
        setMessage({ message: response.message, status: response.status })
        handleCloseTextArea()
        
    }
    async function postDeleteDetail(id, index) {
        let response
        try {
            response = await apis.deteleDetail(id)
            if (response.status === 200) {
                details.splice(index, 1)
                setDetails(details)
            }
        } catch (error) {
            console.log(error)
        }
        setMessage({ message: response.message, status: response.status })
        handleCloseTextArea()
       
    }
    details.map((param, index) => {
        trParam.push(
            <tr key={param.id}>
                <th>{index + 1}</th>
                {
                    (showOptions.index !== null && showOptions.index === param.id)
                        ?
                        (
                            (showOptions.opt === 0)
                                ?
                                <>
                                    <td><textarea className="form-control" defaultValue={param.detail} id={"newDetail" + param.id}></textarea></td>
                                    <td><button className="btn btn-outline-warning w-100" onClick={() => { postUpdDetail(param.id, index) }}> <b>Agregar</b> </button>
                                    </td><td><button className="btn btn-outline-primary w-100" onClick={handleCloseTextArea}> <b>Volver</b> </button></td>
                                </>
                                :
                                <>
                                    <td>
                                        <div class="alert alert-warning text-center" role="alert">
                                            <strong>¿Seguro desea borrar este el comentario? </strong>
                                        </div>
                                    </td>
                                    <td><button className="btn btn-outline-primary w-100" onClick={() => postDeleteDetail(param.id, index)}><b>Aceptar</b> </button></td>
                                    <td><button className="btn btn-outline-danger w-100" onClick={handleCloseTextArea}> <b>Cancelar</b> </button></td>
                                </>
                        )
                        :
                        (<>
                            <td>{(param.detail !== "") ? param.detail : "Sin detalle"}</td>
                            <td><button className="btn btn-outline-success" onClick={() => handleShowTextArea(param.id, 0)}> <b>Modificar</b> </button></td>
                            <td><button className="btn btn-outline-danger" onClick={() => handleShowWarning(param.id, 1)}> <b>Borrar  </b> </button></td>
                        </>)

                }
            </tr >
        )
    })
   
    return (
        <>
            <Message props={message}></Message>
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