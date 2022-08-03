import { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import apis from "../../../services/apiCalls"
import DetailTable from "./DetailTable"
import Message from "../../commons/Message";
function ModalDetails(params) {

    const [show, setShow] = useState(false);
    const [showNewDetail, setShowNewDetail] = useState(false)
    const [message, setMessage] = useState(null)
    const [tableDetails, setTableDetails] = useState(params.details.file_detail)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShowNewDetail = () => setShowNewDetail(true)
    const handleCloseNewDetail = () => setShowNewDetail(false)

    
    async function postNewDetail(params) {
        let newDetail = document.getElementById("textarea_detail").value.trim()
      
        if (newDetail !== null && newDetail !== "") {
            let query = await apis.newDetail({ detail: newDetail, file_id: params.details.file_id })
            if(query.status === 200){
                tableDetails.push(query.response.detail)
                setTableDetails(tableDetails)
                handleCloseNewDetail()
            }
            setMessage({ message: query.response.message, status: query.status })
        } else (
            console.log("detalle nulo")
        )
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
                <Message props={message}></Message>
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
                    {
                    showNewDetail ?
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