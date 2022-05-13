import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import apis from "./apiFunctions";
import DetailTable from "./DetailTable"

function ModalDetails(params) {

    const [show, setShow] = useState(false);
    const [showNewDetail, setShowNewDetail] = useState(false)
    const [message, setMessage] = useState(null)
    const [tableDetails, setTableDetails] = useState(params.details)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShowNewDetail = () => setShowNewDetail(true)
    const handleCloseNewDetail = () => setShowNewDetail(false)

    async function postNewDetail(params) {
        let newDetail = document.getElementById("textarea_detail").value.trim()
        if (newDetail !== null && newDetail !== "") {
            let response = await apis.newDetail({ detail: newDetail, file_id: params.details[0].id })
            if(response.status === 1){
                tableDetails.push(response.detail)
                setTableDetails(tableDetails)
                handleCloseNewDetail()
            }
            setMessage({ message: response.message, status: response.status })
        } else (
            console.log("detalle nulo")
        )
    }
    function postStatus() {
        if (message != null)
            if (message.status === 1) {
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
            <Button className="w-100 mt-3" variant="outline-dark" size="lg" onClick={handleShow}>
                Ver detalles
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton className="bg-dark text-white">
                    <Modal.Title><b>Detalles</b></Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light">
                {postStatus()}
                    {showNewDetail ?
                        <div>
                            <div class="form-group">
                                <label for="textarea_detail">Nuevo detalle</label>
                                <textarea class="form-control" id="textarea_detail" rows="3"></textarea>
                            </div>
                        </div>
                        :
                        <DetailTable details={tableDetails}></DetailTable>}
                </Modal.Body>
                <Modal.Footer className="bg-dark">
                    {showNewDetail ?
                        <>
                            <Button variant="light" onClick={() => postNewDetail(params)}>
                                Agregar
                            </Button>
                            <Button variant="primary" onClick={handleCloseNewDetail}>
                                Volver
                            </Button>
                        </>
                        :
                        <>
                            <Button variant="outline-light" onClick={handleShowNewDetail}>
                                Agregar nuevo detalle
                            </Button>
                            <Button variant="light" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </>
                    }    
                </Modal.Footer>
                
            </Modal>
        </>
    )
}

export default ModalDetails