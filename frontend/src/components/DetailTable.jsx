import { useState } from "react"
import apis from "./apiFunctions"
function DetailTable(params) {
    console.log(params)
    const [showTextArea, setShowTextArea] = useState(true)

    const handleShowTextArea = () => setShowTextArea(false)
    const handleCloseTextArea = () => setShowTextArea(true)

    let trParam = []

    async function postNewDetail(id) {
        let response = await apis.updateDetail(
            {
                detail_id: id,
                detail: document.getElementById("newDetail").value
            }
        )
        console.log(response)
    }

    params.details.map(param => {
        trParam.push(
            <tr>
                <th id={param.id}>{param.id}</th>
                {showTextArea ?
                    <>
                        <td>{(param.detail !== "") ? param.detail : "Sin detalle"}</td>
                        <td><button className="btn btn-outline-success" onClick={handleShowTextArea}> Modificar </button></td>
                    </>
                    :
                    <>
                        <td><textarea className="form-control" defaultValue={param.detail} id="newDetail"></textarea></td>
                        <div>
                            <td><button className="btn btn-outline-success" onClick={() => {postNewDetail(param.id)}}> Agregar </button></td>
                            <td><button className="btn btn-outline-primary" onClick={handleCloseTextArea}> Volver </button></td>
                        </div>
                    </>
                }
            </tr>
        )
    })

    return (
        <>
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